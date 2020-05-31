<script>
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';

	import { onMount } from 'svelte';
	import { themeSetting } from '@/state/store';

	let theme = 'dark'; // default fallback

	onMount(() => {
		const oldTheme = theme;
		const newTheme = localStorage.getItem('theme');

		if (newTheme && newTheme !== theme && [ 'dark', 'light' ].includes(newTheme)) {
			theme = newTheme;
		}

		document.documentElement.classList.replace(oldTheme, theme);
		themeSetting.set(theme);
	});

	export let segment;
</script>

<Header {segment}/>

<main>
	<div class="page mid">
		<slot></slot>
	</div>
</main>

<Footer />
