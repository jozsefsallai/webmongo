<script>
  import { goto } from '@sapper/app';

  export let server;
  export let database;

  let error = null;

  function handleFormSubmit(e) {
    e.preventDefault();
    error = null;

    const name = e.target.name.value && e.target.name.value.trim();

    if (!name || !name.length) {
      error = 'Please provide a valid collection name.';
      return;
    }

    return goto(`/browse/${server}/${database}/${encodeURIComponent(name)}`);
  }
</script>

<section class="create-collection-container">
  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <form on:submit={handleFormSubmit}>
    <div class="input-group">
      <label for="name">Name:</label>
      <input name="name" id="name" autocomplete="off" spellcheck="false">
    </div>
    <div class="input-group">
      <p>
        Remember to create a document after you get redirected to the collection's
        page, or else the collection will not be saved.
      </p>
    </div>
    <div class="input-group submit-button">
      <button type="submit">Create</button>
    </div>
</section>

<style>
  .create-collection-container {
    padding: 2em;
    background: #333;
    margin-top: 2em;
    margin-bottom: 2em;
  }
</style>
