<script>
  import Document from './Document.svelte';

  export let documents;
  export let collection;
  export let database;
  export let connectionString;
</script>

<div class="document-list">
  {#each documents as doc}
    <Document
      {connectionString}
      {database}
      {collection}
      {doc}
    />
  {/each}
</div>
