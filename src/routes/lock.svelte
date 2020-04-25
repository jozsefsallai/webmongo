<script>
  import { get, set, STORAGE_IS_ENCRYPTED } from '@/lib/storage';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { encryptToStorage } from '@/lib/lock';

  let error = null;
  let servers = null;

  onMount(function () {
    servers = get('servers');
    if (!servers || servers === STORAGE_IS_ENCRYPTED) {
      return goto('/');
    }
  });

  function handleLock(e) {
    e.preventDefault();

    error = null;

    const serversJSON = JSON.stringify(servers);
    const passphrase = e.target.passphrase.value;
    const passphrase2 = e.target.passphrase2.value;

    if (passphrase !== passphrase2) {
      error = 'The passphrases do not match.';
      return;
    }

    if (passphrase.trim().length < 8) {
      error = 'The passphrase needs to be at least 8 characters long.';
      return;
    }

    const encrypted = encryptToStorage(serversJSON, passphrase);
    set('servers', encrypted, true);

    goto('/');
  }
</script>

<svelte:head>
  <title>Lock Data</title>
</svelte:head>

<h1>Lock Data</h1>

<section class="content">
  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <form on:submit={handleLock}>
    <div class="input-group">
      <label for="passphrase">Passphrase (min. 8 characters)</label>
      <input type="password" id="passphrase" name="passphrase">
    </div>
    <div class="input-group">
      <label for="passphrase2">Re-enter your passphrase</label>
      <input type="password" id="passphrase2" name="passphrase2">
    </div>
    <div class="input-group submit-button">
      <button type="submit">Lock</button>
    </div>
  </form>
</section>
