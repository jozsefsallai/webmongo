<script>
  import filesize from '../../lib/filesize';
  import { createEventDispatcher } from 'svelte';

  import EditCollection from './EditCollection.svelte';

  export let collection;
  export let database;
  export let server;
  export let connectionString;

  const dispatch = createEventDispatcher();

  let error = null;
  let editMode = false;

  const size = filesize(collection.size);

  function toggleEditMode() {
    editMode = !editMode;
  }

  function handleEditSuccess(e) {
    collection = e.detail.collection;
    toggleEditMode();
  }

  async function handleDeleteClick(e) {
    e.preventDefault();

    const firstPrompt = [
      'Are you sure you want to delete this collection?',
      'ALL DOCUMENTS inside of this collection will be PERMANENTLY DELETED.',
      'Do you stil want to proceed?'
    ].join(' ');

    const secondPrompt = [
      'Are you VERY VERY SURE that you want to do this?',
      'Remember that this action is IRREVERSIBLE and results in DATA LOSS.'
    ].join(' ');

    if (confirm(firstPrompt) && confirm(secondPrompt)) {
      error = null;

      try {
        const response = await fetch(`/api/databases/${database}/${collection.name}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Connection-String': connectionString
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            confirmation: true
          })
        }).then(res => res.json());

        if (response.ok) {
          return dispatch('deleted');
        } else {
          error = response.error && response.error.length
            ? response.error
            : 'Something bad happened.';
          return;
        }
      } catch (err) {
        error = err.message;
        return;
      }
    }
  }
</script>

{#if error && error.length}
  <div class="error-container">
    {error}
  </div>
{/if}

<section class="collection-entry" class:opened={editMode}>
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
      <button class="red-button" on:click={handleDeleteClick}>Drop</button>
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
</section>

<style>
  .collection-entry {
    transition: 150ms transform ease;
  }

  .collection-entry.opened {
    transform: scale(1.04);
  }

  .collection-entry .generic-list {
    border-bottom: 0;
  }

  .collection-entry:last-child .generic-list {
    border-bottom: 3px solid var(--generic-container-border-color);
  }

  @media only screen and ( max-width: 720px ) {
    .generic-list {
      display: block;
      text-align: center;
    }
  }
</style>
