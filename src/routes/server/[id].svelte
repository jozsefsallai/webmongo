<script context="module">
  export function preload({ params }) {
    return params;
  }
</script>

<script>
  import * as storage from '../../lib/storage';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';

  import Loading from '../../components/Loading.svelte';
  import ZeroDataState from '../../components/ZeroDataState.svelte';
  import DatabaseList from '../../components/databases/List.svelte';

  export let id;

  let server = null;
  let error = null;
  let databases = null;

  onMount(async function () {
    const servers = storage.get('servers');
    if (!servers) {
      return goto('/');
    }

    server = servers[id];
    if (!server) {
      return goto('/');
    }

    try {
      const response = await fetch('/api/server/databases', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Connection-String': server.connectionString
        },
        credentials: 'same-origin'
      }).then(res => res.json());

      if (!response.ok) {
        error = response.error && response.error.length
          ? response.error
          : 'Something bad happened.';
        return;
      }

      databases = response.databases;
    } catch (err) {
      error = err.message;
      return;
    }
  });
</script>

<svelte:head>
  {#if server}
    <title>{server.name}</title>
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

{#if server && databases}
  <h1>{server.name}</h1>

  <section class="content">
    {#if databases && databases.length}
      <DatabaseList {databases} server={id} />
    {:else}
      <ZeroDataState>
        This server has no databases.
      </ZeroDataState>
    {/if}
  </section>
{:else}
  {#if !error}
    <Loading />
  {/if}
{/if}
