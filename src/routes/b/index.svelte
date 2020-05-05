<script>
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';

  let error = null;
  let hash = null;

  onMount(function () {
    hash = window.location.hash;

    if (!hash) {
      return goto('/');
    }

    hash = hash.slice(1);
  });

  function handleConfirmClick(e) {
    e.preventDefault();

    error = null;

    try {
      const encryptedString = atob(hash);

      if (!encryptedString.startsWith('enc+')) {
        error = 'The provided hash is invalid.';
        return;
      }

      localStorage.setItem('servers', encryptedString);
      return goto('/');
    } catch (err) {
      error = err.message;
    }
  }

  function handleCancelClick(e) {
    e.preventDefault();
    return goto('/');
  }
</script>

<svelte:head>
  <title>Import From Bookmark URL</title>
</svelte:head>

<section class="content">
  <h1>Import From Bookmark URL</h1>

  <p>
    Are you sure you want to import the contents of this bookmark URL?
    All your previously saved servers will be overwritten.
  </p>

  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <div class="deletion-options">
    <button class="red-button" on:click={handleConfirmClick}>Yes, I'm sure</button>
    <button on:click={handleCancelClick}>Nope, I'm good</button>
  </div>
</section>
