<script>
  import { set } from '../lib/storage';
  import { goto } from '@sapper/app';

  import AES from 'crypto-js/aes';
  import utf8 from 'crypto-js/enc-utf8';

  let error = null;

  function handleImport(e) {
    e.preventDefault();

    error = null;

    const file = e.target.file.files[0];
    const passphrase = e.target.passphrase.value;

    if (!file) {
      error = 'You need to upload an exported file.';
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file, 'utf-8');

    reader.onload = function (e) {
      let decrypted = null;

      try {
        const bytes = AES.decrypt(e.target.result, passphrase);
        decrypted = bytes.toString(utf8);
      } catch (err) {
        error = 'Invalid file contents or wrong passphrase.';
        return;
      }

      try {
        const decryptedJSON = JSON.parse(decrypted);
        set('servers', decryptedJSON);
        goto('/');
      } catch (err) {
        error = 'Failed to parse JSON.';
      }
    };

    reader.onerror = function (e) {
      error = `Error while reading the file.`;
      reader.abort();
    };
  }
</script>

<svelte:head>
  <title>Import Servers</title>
</svelte:head>

<h1>Import Servers</h1>

<section class="content">
  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <p><strong>Warning!</strong> This will overwrite your current servers.</p>

  <form on:submit={handleImport}>
    <div class="input-group">
      <label for="file">File:</label>
      <input type="file" name="file" id="file" autocomplete="off">
    </div>
    <div class="input-group">
      <label for="passphrase">Passphrase:</label>
      <input type="password" id="passphrase" name="passphrase">
    </div>
    <div class="input-group submit-button">
      <button type="submit">Import</button>
    </div>
  </form>
</section>
