<script>
  import Document from './Document.svelte';

  export let documents;
  export let collection;
  export let database;
  export let server;
</script>

<div class="document-list">
  {#each documents as doc}
    <Document
      {server}
      {database}
      {collection}
      {doc}
    />
  {/each}
</div>
