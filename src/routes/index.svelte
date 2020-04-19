<script>
	import Loading from '@/components/Loading.svelte';
	import ZeroDataState from '@/components/ZeroDataState.svelte';
	import ServerList from '@/components/serverlist/List.svelte';

	import { onMount } from 'svelte';
	import * as storage from '@/lib/storage';
	import { breadcrumbs } from '@/state/store';

	let loading = true;
	let servers = null;
	let serversList = [];

	onMount(() => {
		breadcrumbs.set([]);

		servers = storage.get('servers');
		if (servers) {
			serversList = Object.keys(servers);
		}

		loading = false;
	});
</script>

<svelte:head>
	<title>WebMongo</title>
</svelte:head>

<div class="title-with-button">
	<h1>Servers</h1>
	<a href="/new">New</a>
</div>

<section class="content">
	{#if loading}
		<Loading />
	{:else}
		{#if serversList && serversList.length}
			<ServerList {servers} serverIDs={serversList} />
		{:else}
			<ZeroDataState>
				You have no servers yet.
			</ZeroDataState>
		{/if}

		<section class="general-actions">
			<a class="button" href="/import">Import</a>
			{#if serversList && serversList.length}
				<a class="button" href="/export">Export</a>
				<a class="button red-button" href="/purge">Purge all data</a>
			{/if}
		</section>
	{/if}
</section>

<style>
	.general-actions {
		text-align: center;
		padding: 3em 1em;
	}
</style>
