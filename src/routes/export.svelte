<script>
  import { get } from '../lib/storage';
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import FileSaver from 'file-saver';

  import AES from 'crypto-js/aes';

  let servers = null;
  let error = null;

  onMount(function () {
    servers = get('servers');

    if (!servers) {
      goto('/');
    }
  });

  function handleExport(e) {
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

    const encrypted = AES.encrypt(serversJSON, passphrase);
    const blob = new Blob([ encrypted ], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'webmongo.txt', { autoBom: true });
  }
</script>

<svelte:head>
  <title>Export Servers</title>
</svelte:head>

<h1>Export Servers</h1>

<section class="content">
  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <form on:submit={handleExport}>
    <div class="input-group">
      <label for="passphrase">Passphrase (min. 8 characters)</label>
      <input type="password" id="passphrase" name="passphrase">
    </div>
    <div class="input-group">
      <label for="passphrase2">Re-enter your passphrase</label>
      <input type="password" id="passphrase2" name="passphrase2">
    </div>
    <div class="input-group submit-button">
      <button type="submit">Export</button>
    </div>
  </form>
</section>
