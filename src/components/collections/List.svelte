<script>
  import Collection from './Collection.svelte';

  export let collections;
  export let database;
  export let server;
</script>

<div class="collection-list">
  {#each collections as collection}
    <Collection {server} {database} {collection} />
  {/each}
</div>
