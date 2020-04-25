<script context="module">
  export function preload({ params }) {
    return params;
  }
</script>

<script>
  import * as storage from '@/lib/storage';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { breadcrumbs } from '@/state/store';

  import Loading from '@/components/Loading.svelte';
  import ZeroDataState from '@/components/ZeroDataState.svelte';
  import CollectionsList from '@/components/collections/List.svelte';
  import CreateCollectionContainer from '@/components/collections/CreateCollection.svelte';

  export let server;
  export let database;

  let targetServer = null;
  let error = null;
  let collections = null;
  let createCollectionContainerVisible = false;

  async function fetchCollections() {
    collections = null;

    try {
      const response = await fetch(`/api/databases/${database}`, {
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

      collections = response.collections;
    } catch (err) {
      error = err.message;
      return;
    }
  }

  onMount(async function () {
    const servers = storage.get('servers');
    if (!servers || servers === storage.STORAGE_IS_ENCRYPTED) {
      return goto('/');
    }

    targetServer = servers[server];
    if (!targetServer) {
      return goto('/');
    }

    breadcrumbs.set([
      { label: targetServer.name, url: `/browse/${server}` },
      { label: database }
    ]);

    await fetchCollections();
  });

  function toggleCreateCollectionContainer() {
    createCollectionContainerVisible = !createCollectionContainerVisible;
  }
</script>

<svelte:head>
  {#if targetServer && database}
    <title>{database} ({targetServer.name})</title>
  {:else}
    <title>Loading...</title>
  {/if}
</svelte:head>

<div class="title-with-button">
  <h1>{database}</h1>
  <button on:click={toggleCreateCollectionContainer}>New</button>
</div>

<section class="content">
  {#if createCollectionContainerVisible}
    <CreateCollectionContainer
      {server}
      {database}
    />
  {/if}

  {#if error && error.length}
    <div class="error-container">
      {error}
    </div>
  {/if}

  {#if targetServer && collections}
    {#if collections.length}
      <CollectionsList
        {collections}
        {database}
        {server}
        connectionString={targetServer.connectionString}
        on:update={fetchCollections}
      />
    {:else}
      <ZeroDataState>
        This database has no collections.
      </ZeroDataState>
    {/if}
  {:else}
    {#if !error}
      <Loading />
    {/if}
  {/if}
</section>
