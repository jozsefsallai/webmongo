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

  export let id;

  let servers = null;
  let target = null;

  onMount(function () {
    servers = storage.get('servers');
    if (!servers) {
      return goto('/');
    }

    target = servers[id];
    if (!target) {
      return goto('/');
    }
  });

  function confirmDeletion() {
    delete servers[id];
    storage.set('servers', servers);

    goto('/');
  }

  function cancelDeletion() {
    goto('/');
  }
</script>

<svelte:head>
  {#if target}
    <title>Delete "{target.name}"</title>
  {:else}
    <title>Delete Server</title>
  {/if}
</svelte:head>

{#if target}
  <h1>Delete "{target.name}"</h1>

  <section class="content">
    <p>Are you sure you want to delete the server <strong>"{target.name}"</strong>? This action is irreversible.</p>
    <div class="deletion-options">
      <button class="red-button" on:click={confirmDeletion}>Yes, please delete it</button>
      <button on:click={cancelDeletion}>No, I changed my mind</button>
    </div>
  </section>
{:else}
  <Loading />
{/if}
