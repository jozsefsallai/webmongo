<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import codeflask from '@/lib/codeflask';

  import SubmitWithLoading from '@/components/SubmitWithLoading.svelte';

  export let connectionString;
  export let database;
  export let collection;
  export let id;
  export let original;

  const dispatch = createEventDispatcher();

  let error = null;

  let editorElement;
  let editor;

  onMount(function () {
    editor = codeflask(editorElement);
  });

  async function handleFormSubmit(e) {
    e.preventDefault();

    error = null;

    let payload = editor.getCode();

    try {
      payload = JSON.parse(payload);
    } catch (err) {
      error = 'Invalid JSON.';
      return;
    }

    try {
      const response = await fetch(`/api/databases/${database}/${collection}/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Connection-String': connectionString
        },
        credentials: 'same-origin',
        body: JSON.stringify({ payload })
      }).then(res => res.json());

      if (!response.ok) {
        error = response.error && response.error.length
          ? response.error
          : 'Something bad happened.';
        return;
      } else {
        dispatch('success', { document: response.document });
      }
    } catch (err) {
      error = err.message;
      return;
    }
  }

  function handleCancelClick(e) {
    e.preventDefault();
    dispatch('cancelled');
  }
</script>

<form on:submit={handleFormSubmit}>
  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <div class="input-group">
    <label for="payload">Contents:</label>
    <div
      class="json-editor"
      bind:this={editorElement}
    >{JSON.stringify(original, null, 2)}</div>
  </div>
  <div class="input-group submit-button">
    <SubmitWithLoading callback={handleFormSubmit}>Save</SubmitWithLoading>
    <button on:click={handleCancelClick}>Cancel</button>
  </div>
</form>

<style>
  form {
    margin: 0;
    padding: 2em;
    background: #121212;
  }
</style>
