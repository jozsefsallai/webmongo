<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { CodeMirror, defaultConfig } from '@/lib/codemirror';

  import SubmitWithLoading from '@/components/SubmitWithLoading.svelte';

  export let connectionString;
  export let database;
  export let collection;

  const dispatch = createEventDispatcher();

  let error = null;
  let successVisible = false;

  let editorElement;
  let editor;

  onMount(function () {
    editor = CodeMirror.fromTextArea(editorElement, defaultConfig);
  });

  async function handleFormSubmit(e) {
    e.preventDefault();

    error = null;

    let payload = editor.getValue();

    try {
      payload = JSON.parse(payload);
    } catch (err) {
      error = 'Invalid JSON.';
      return;
    }

    try {
      const response = await fetch(`/api/databases/${database}/${collection}`, {
        method: 'POST',
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
        successVisible = true;
        dispatch('success');
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

<section class="create-document-container">
  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  {#if successVisible}
    <div class="success-container">
      Document created successfully.
    </div>
  {:else}
    <form on:submit={handleFormSubmit}>
      <div class="input-group">
        <label for="payload">Contents:</label>
        <textarea class="json-editor" bind:this={editorElement}>{'{\n\t\n}'}</textarea>
      </div>
      <div class="input-group submit-button">
        <SubmitWithLoading callback={handleFormSubmit}>Add</SubmitWithLoading>
        <button on:click={handleCancelClick}>Cancel</button>
      </div>
    </form>
  {/if}
</section>

<style>
  .create-document-container {
    padding: 2em;
    background: #121212;
    margin-top: 2em;
  }

  .success-container {
    margin-bottom: 0;
  }
</style>
