<script>
  import filesize from '../../lib/filesize';

  import EditCollection from './EditCollection.svelte';

  export let collection;
  export let database;
  export let server;
  export let connectionString;

  let editMode = false;

  const size = filesize(collection.size);

  function toggleEditMode() {
    editMode = !editMode;
  }

  function handleEditSuccess(e) {
    collection = e.detail.collection;
    toggleEditMode();
  }
</script>

<div class="generic-list">
  <div class="name">
    <a href={`/browse/${server}/${database}/${collection.name}`}>
      { collection.name }
    </a>
    <small class="additional-info">
      <strong>Size:</strong> {size},
      <strong>Documents:</strong> {collection.count}
    </small>
  </div>
  <div class="actions">
    <button on:click={toggleEditMode}>Edit</button>
  </div>
</div>

{#if editMode}
  <EditCollection
    {connectionString}
    {database}
    collection={collection.name}
    on:cancelled={toggleEditMode}
    on:success={handleEditSuccess}
  />
{/if}
