<script>
  import ObjectData from './ObjectData.svelte';
  import { onMount } from 'svelte';

  export let doc;
  export let collection;
  export let database;
  export let connectionString;

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
          console.log('document delete success');
          return;
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

<div class="generic-list document-list">
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

<style>
  .document-list {
    border-top: 3px solid #333;
  }
</style>
