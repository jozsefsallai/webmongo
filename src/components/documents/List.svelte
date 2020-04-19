<script>
  import { createEventDispatcher } from 'svelte';
  import Document from './Document.svelte';

  export let documents;
  export let collection;
  export let database;
  export let connectionString;

  const dispatch = createEventDispatcher();

  function handleOnDeleted() {
    dispatch('update');
  }
</script>

<div class="document-list">
  {#each documents as doc}
    <Document
      {connectionString}
      {database}
      {collection}
      {doc}
      on:deleted={handleOnDeleted}
    />
  {/each}
</div>
