<script>
  import cuid from 'cuid';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import * as storage from '@/lib/storage';

  let error = null;
  let servers = {};

  onMount(function () {
    servers = storage.get('servers');
    if (servers === storage.STORAGE_IS_ENCRYPTED) {
      return goto('/');
    }
  });

  async function handleFormSubmit(e) {
    e.preventDefault();

    error = null;

    const name = e.target.name.value;

    if (name.trim().length < 3) {
      error = 'Please provide a name longer than 2 characters.';
      return;
    }

    const connectionString = e.target.connectionstring.value;

    if (connectionString.trim().length < 10) {
      // TODO
      error = 'Invalid connection string.';
      return;
    }

    const id = cuid();

    servers[id] = {
      name,
      connectionString
    };

    storage.set('servers', servers);

    await goto('/');
  }
</script>

<svelte:head>
	<title>Add New Server - WebMongo</title>
</svelte:head>

<h1>Add New Server</h1>

<section class="content">
  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <form on:submit={handleFormSubmit}>
    <div class="input-group">
      <label for="name">Friendly name:</label>
      <input name="name" id="name" autocomplete="off" spellcheck="false">
    </div>
    <div class="input-group">
      <label for="connectionstring">Connection string:</label>
      <input name="connectionstring" id="connectionstirng" autocomplete="off" spellcheck="false">
    </div>
    <div class="input-group submit-button">
      <button type="submit">Add</button>
    </div>
  </form>
</section>
