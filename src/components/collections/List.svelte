<script>
  import Collection from './Collection.svelte';

  export let collections;
  export let database;
  export let server;
  export let connectionString;
</script>

<div class="collection-list">
  {#each collections as collection}
    <Collection
      {server}
      {database}
      {collection}
      {connectionString}
    />
  {/each}
</div>
