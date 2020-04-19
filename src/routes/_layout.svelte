<script>
	import Header from '@/components/Header.svelte';

	export let segment;
</script>

<Header {segment}/>

<main>
	<div class="page mid">
		<slot></slot>
	</div>
</main>
