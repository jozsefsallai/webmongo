<script context="module">
  export function preload({ params, query }) {
    return { ...params, ...query };
  }
</script>

<script>
  import * as storage from '@/lib/storage';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import createParams from '@/lib/createParams';
  import { breadcrumbs } from '@/state/store';

  import Loading from '@/components/Loading.svelte';
  import ZeroDataState from '@/components/ZeroDataState.svelte';
  import Filters from '@/components/documents/Filters.svelte';
  import Pagination from '@/components/documents/Pagination.svelte';
  import DocumentsList from '@/components/documents/List.svelte';

  // url params
  export let server;
  export let database;
  export let collection;

  // query params
  export let q = '{}';
  export let sort = '';
  export let project = '{}';
  export let limit = 20;
  export let skip = 0;

  let targetServer = null;
  let error = null;
  let documents = null;
  let total = 0;

  let CreateDocumentContainer;
  let createDocumentContainerVisible = false;

  let filterContainerVisible = false;

  async function fetchDocuments (params) {
    try {
      if (!params) {
        params = new URLSearchParams();
        q && params.append('q', q);
        sort && params.append('sort', sort);
        project && params.append('project', project);
        limit && params.append('limit', limit);
        skip && params.append('skip', skip);
      }

      const url = `/api/databases/${database}/${collection}?${params.toString()}`;

      const response = await fetch(url, {
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
      total = response.count;
    } catch (err) {
      error = err.message;
      return;
    }
  }

  onMount(async function () {
    const servers = storage.get('servers');
    if (!servers) {
      return goto('/');
    }

    targetServer = servers[server];
    if (!targetServer) {
      return goto('/');
    }

    breadcrumbs.set([
      { label: targetServer.name, url: `/browse/${server}` },
      { label: database, url: `/browse/${server}/${database}` },
      { label: collection }
    ]);

    await fetchDocuments();

    const createDocumentContainerModule = await import('@/components/documents/CreateDocument.svelte');
    CreateDocumentContainer = createDocumentContainerModule.default;
  });

  function toggleCreateDocumentContainer() {
    createDocumentContainerVisible = !createDocumentContainerVisible;
  }

  function toggleFilterContainer() {
    filterContainerVisible = !filterContainerVisible;
  }

  async function handleCreateSuccess() {
    await fetchDocuments();
    setTimeout(toggleCreateDocumentContainer, 5000);
  }

  async function handleFilterUpdate(e) {
    error = null;
    documents = null;

    const { params } = e.detail;

    q = params.q;
    sort = params.sort;
    project = params.project;
    limit = params.limit;
    skip = params.skip;

    goto(e.detail.url); // doesn't actually update the preloaded state
    await fetchDocuments(); // so we have to refetch
  }

  async function handlePaginationUpdate(e) {
    error = null;
    documents = null;

    skip = e.detail.skip;

    const params = createParams({ q, sort, project, limit, skip });
    goto(`/browse/${server}/${database}/${collection}?${params.toString()}`);
    await fetchDocuments();
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
    <div>
      <button on:click={toggleFilterContainer}>Filters</button>
      <button on:click={toggleCreateDocumentContainer}>New</button>
    </div>
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

  {#if filterContainerVisible}
    <Filters
      {q} {sort} {project} {limit} {skip}
      {server} {database} {collection}
      on:update={handleFilterUpdate}
      on:cancel={toggleFilterContainer}
    />
  {/if}

  {#if documents.length && limit < total}
    <Pagination
      {skip} {limit} {total}
      on:update={handlePaginationUpdate}
    />
  {/if}

  <div class="content">
    {#if documents.length}
      <DocumentsList
        {documents}
        {collection}
        {database}
        connectionString={targetServer.connectionString}
      />
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
