<script>
  import { createEventDispatcher } from 'svelte';
  import Collection from './Collection.svelte';

  export let collections;
  export let database;
  export let server;
  export let connectionString;

  const dispatch = createEventDispatcher();

  function handleOnDeleted() {
    dispatch('update');
  }
</script>

<div class="collection-list">
  {#each collections as collection}
    <Collection
      {server}
      {database}
      {collection}
      {connectionString}
      on:deleted={handleOnDeleted}
    />
  {/each}
</div>
