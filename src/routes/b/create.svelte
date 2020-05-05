<script>
  import { get, set, STORAGE_IS_ENCRYPTED } from '@/lib/storage';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { encryptToStorage } from '@/lib/lock';

  let error = null;
  let servers = null;
  let bookmark = null;

  onMount(function () {
    servers = get('servers');
    if (!servers || servers === STORAGE_IS_ENCRYPTED) {
      return goto('/');
    }
  });

  function handleBookmarkCreate(e) {
    e.preventDefault();

    bookmark = null;
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

    const encryptedStorageContents = encryptToStorage(serversJSON, passphrase);
    const url = [
      window.location.protocol,
      "",
      window.location.host,
      'b',
      `#${btoa(encryptedStorageContents)}`
    ];

    bookmark = url.join('/');
  }
</script>

<svelte:head>
  <title>Create Bookmark</title>
</svelte:head>

<h1>Create Bookmark</h1>

<section class="content">
  <p>
    You can create a customized bookmark for accessing your servers quickly
    and easily from anywhere. This does require locking your data behind a
    passphrase.
  </p>

  {#if bookmark && bookmark.length}
    <div class="bookmark">
      <p><strong>Here's your bookmark:</strong></p>
      <a href={bookmark} target="_blank">Drag me to your bookmarks!</a>
    </div>
  {/if}

  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  <form on:submit={handleBookmarkCreate}>
    <div class="input-group">
      <label for="passphrase">Passphrase (min. 8 characters)</label>
      <input type="password" id="passphrase" name="passphrase">
    </div>
    <div class="input-group">
      <label for="passphrase2">Re-enter your passphrase</label>
      <input type="password" id="passphrase2" name="passphrase2">
    </div>
    <div class="input-group submit-button">
      <button type="submit">Create</button>
    </div>
  </form>
</section>

<style>
  .bookmark {
    margin: 2em 0;
    padding: .2em 1em;
    padding-bottom: 2em;
    text-align: center;
    background: #111;
    border-radius: 3px;
  }

  .bookmark a {
    display: inline-block;
    background: var(--mongo-green);
    color: #fff;
    padding: 0.8em 3em;
  }
</style>
