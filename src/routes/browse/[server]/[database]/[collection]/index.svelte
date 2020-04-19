<script context="module">
  export function preload({ params }) {
    return params;
  }
</script>

<script>
  import * as storage from '@/lib/storage';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';

  import Loading from '@/components/Loading.svelte';
  import ZeroDataState from '@/components/ZeroDataState.svelte';
  import DocumentsList from '@/components/documents/List.svelte';

  export let server;
  export let database;
  export let collection;

  let targetServer = null;
  let error = null;
  let documents = null;

  let CreateDocumentContainer;
  let createDocumentContainerVisible = false;

  onMount(async function () {
    const servers = storage.get('servers');
    if (!servers) {
      return goto('/');
    }

    targetServer = servers[server];
    if (!targetServer) {
      return goto('/');
    }

    try {
      const response = await fetch(`/api/databases/${database}/${collection}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Connection-String': targetServer.connectionString
        },
        credentials: 'same-origin'
      }).then(res => res.json());

      if (!response.ok) {
        error = response.error && response.error.length
          ? response.error
          : 'Something bad happened.';
        return;
      }

      documents = response.documents;
    } catch (err) {
      error = err.message;
      return;
    }

    const createDocumentContainerModule = await import('@/components/documents/CreateDocument.svelte');
    CreateDocumentContainer = createDocumentContainerModule.default;
  });

  function toggleCreateDocumentContainer() {
    createDocumentContainerVisible = !createDocumentContainerVisible;
  }

  function handleCreateSuccess() {
    console.log('added to coll');
    toggleCreateDocumentContainer();
  }
</script>

<svelte:head>
  {#if targetServer}
    <title>{database} / {collection} ({targetServer.name})</title>
  {:else}
    <title>Loading...</title>
  {/if}
</svelte:head>

{#if error && error.length}
  <section class="content">
    <div class="error-container">
      {error}
    </div>
  </section>
{/if}

{#if targetServer && documents}
  <div class="title-with-button">
    <h1>{database} / {collection} ({targetServer.name})</h1>
    <button on:click={toggleCreateDocumentContainer}>New</button>
  </div>

  {#if createDocumentContainerVisible}
    <svelte:component
      this={CreateDocumentContainer}
      connectionString={targetServer.connectionString}
      {database}
      {collection}
      on:cancelled={toggleCreateDocumentContainer}
      on:success={handleCreateSuccess}
    />
  {/if}

  <div class="content">
    {#if documents.length}
      <DocumentsList {documents} {collection} {database} {server} />
    {:else}
      <ZeroDataState>
        This collection has no entries.
      </ZeroDataState>
    {/if}
  </div>
{:else}
  {#if !error}
    <Loading />
  {/if}
{/if}
