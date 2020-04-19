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

  export let server;
  export let database;

  let targetServer = null;
  let error = null;
  let collections = null;

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
      { label: database }
    ]);

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
  });
</script>

<svelte:head>
  {#if targetServer && database}
    <title>{database} - {targetServer.name}</title>
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

{#if targetServer && collections}
  <h1>{database} ({targetServer.name})</h1>

  <section class="content">
    {#if collections.length}
      <CollectionsList {collections} {database} {server} />
    {:else}
      <ZeroDataState>
        This database has no collections.
      </ZeroDataState>
    {/if}
  </section>
{:else}
  {#if !error}
    <Loading />
  {/if}
{/if}
