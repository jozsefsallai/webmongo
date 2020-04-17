<script>
  import { goto } from '@sapper/app';

  function confirmDeletion() {
    localStorage.clear();
    return goto('/');
  }

  function cancelDeletion() {
    return goto('/');
  }
</script>

<h1>Purge All Data</h1>

<section class="content">
  <p>Are you sure you want to purge <strong>all</strong> data?</p>
  <div class="deletion-options">
    <button class="red-button" on:click={confirmDeletion}>Yes, purge all</button>
    <button on:click={cancelDeletion}>No, go back</button>
  </div>
</section>
