<script>
	import Loading from '@/components/Loading.svelte';
	import ZeroDataState from '@/components/ZeroDataState.svelte';
	import ServerList from '@/components/serverlist/List.svelte';

	import { onMount } from 'svelte';
	import * as storage from '@/lib/storage';
	import { decryptFromStorage } from '@/lib/lock';
	import { breadcrumbs } from '@/state/store';

	let loading = true;
	let encrypted = false;
	let error = null;
	let servers = null;
	let serversList = [];

	onMount(() => {
		breadcrumbs.set([
			{ url: '/about', label: 'About' }
		]);

		servers = storage.get('servers');
		if (servers === storage.STORAGE_IS_ENCRYPTED) {
			encrypted = true;
			loading = false;
			return;
		}

		if (servers) {
			serversList = Object.keys(servers);
		}

		loading = false;
	});

	function handleUnlock(e) {
		e.preventDefault();

		loading = true;

		const passphrase = e.target.passphrase.value;
		const data = localStorage.getItem('servers');

		let decrypted = null;

		try {
			decrypted = decryptFromStorage(data, passphrase);
		} catch (err) {
			loading = false;
			error = 'Invalid memory contents or wrong passphrase. Try again or purge data.';
		}

		if (decrypted) {
			storage.set('servers', decrypted, true);

			servers = JSON.parse(decrypted);
			serversList = Object.keys(servers);

			encrypted = false;
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>WebMongo</title>
</svelte:head>

<div class="title-with-button">
	<h1>Servers</h1>
	{#if !loading && !encrypted}
		<a href="/new" class="button">New</a>
	{/if}
</div>

<section class="content">
	{#if loading}
		<Loading />
	{:else}
		{#if encrypted}
			<div class="decrypt-storage-container">
				<p>
					Server list locked. Please enter your passphrase to proceed.
				</p>
				{#if error && error.length}
					<div class="error-container">
						{error}
					</div>
				{/if}

				<form on:submit={handleUnlock}>
					<div class="input-group">
						<label for="passphrase">Passphrase:</label>
						<input type="password" name="passphrase" id="passphrase">
					</div>
					<div class="input-group submit-button">
						<button type="submit">Unlock</button>
					</div>
				</form>
			</div>
		{:else}
			{#if serversList && serversList.length}
				<ServerList {servers} serverIDs={serversList} />
			{:else}
				<ZeroDataState>
					You have no servers yet.
				</ZeroDataState>
			{/if}
		{/if}

		<section class="general-actions">
			{#if encrypted}
				<a class="button red-button" href="/purge">Purge all data</a>
			{:else}
				<a class="button" href="/import">Import</a>
				{#if serversList && serversList.length}
					<a class="button" href="/export">Export</a>
					<a class="button" href="/lock">Lock</a>
					<a class="button red-button" href="/purge">Purge all data</a>
				{/if}
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
