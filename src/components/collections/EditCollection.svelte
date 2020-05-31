<script>
  import { createEventDispatcher } from 'svelte';

  import SubmitWithLoading from '@/components/SubmitWithLoading.svelte';

  export let connectionString;
  export let database;
  export let collection;

  const dispatch = createEventDispatcher();

  let error = null;

  async function handleFormSubmit(e) {
    e.preventDefault();

    error = null;

    const name = e.target.name.value;

    try {
      const response = await fetch(`/api/databases/${database}/${collection}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Connection-String': connectionString
        },
        credentials: 'same-origin',
        body: JSON.stringify({ name })
      }).then(res => res.json());

      if (!response.ok) {
        error = response.error && response.error.length
          ? response.error
          : 'Something bad happened.';
        return;
      } else {
        dispatch('success', { collection: response.collection });
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
    <label for="name">Name:</label>
    <input name="name" id="name" autocomplete="off" spellcheck="false" value={collection}>
  </div>

  <div class="input-group submit-button">
    <button type="submit">Save</button>
    <button on:click={handleCancelClick}>Cancel</button>
  </div>
</form>

<style>
  form {
    margin: 0;
    padding: 2em;
    background: var(--background-faint);
    margin-bottom: 1.5em;
  }
</style>
