<script>
  import ObjectData from './ObjectData.svelte';
  import { onMount, createEventDispatcher } from 'svelte';

  export let doc;
  export let collection;
  export let database;
  export let connectionString;

  const dispatch = createEventDispatcher();

  let error = null;

  let EditDocumentContainer;
  let editMode = false;

  onMount(async function () {
    const editDocumentContainerModule = await import('@/components/documents/EditDocument.svelte');
    EditDocumentContainer = editDocumentContainerModule.default;
  });

  function toggleEditMode() {
    editMode = !editMode;
  }

  function handleEditSuccess(e) {
    doc = e.detail.document;
    toggleEditMode();
  }

  async function deleteDocument() {
    if (confirm('Are you sure you want to delete this document? This action is irreversible!')) {
      error = null;

      try {
        const response = await fetch(`/api/databases/${database}/${collection}/${doc._id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Connection-String': connectionString
          },
          credentials: 'same-origin'
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

<div class="document" class:opened={editMode}>
  <div class="generic-list">
    <div class="name">{doc._id}</div>
    <div class="actions">
      <button on:click={toggleEditMode}>Edit</button>
      <button class="red-button" on:click={deleteDocument}>Delete</button>
    </div>
  </div>

  {#if editMode}
    <svelte:component
      this={EditDocumentContainer}
      {connectionString}
      {database}
      {collection}
      id={doc._id}
      original={doc}
      on:cancelled={toggleEditMode}
      on:success={handleEditSuccess}
    />
  {:else}
    <ObjectData content={doc} />
  {/if}
</div>

<style>
  .document {
    transition: 150ms transform ease;
    margin-bottom: 1.5em;
    border-bottom: 3px solid var(--generic-container-border-color);
  }

  .document .generic-list {
    border-top: 3px solid var(--generic-container-border-color);
    border-bottom: 0;
  }

  .document.opened {
    transform: scale(1.04);
  }

  @media only screen and ( max-width: 720px ) {
    .document .generic-list {
      display: block;
      text-align: center;
    }

    .document.opened {
      transform: none;
    }
  }
</style>
