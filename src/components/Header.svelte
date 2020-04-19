<script>
	import Breadcrumbs from '@/components/Breadcrumbs.svelte';

	export let segment;
</script>

<header>
	<section class="mid nav-flex-wrapper">
		<div class="header-left">
			<a aria-current="{segment === undefined ? 'page' : undefined}" href=".">WebMongo</a>
		</div>
		<nav class="header-right">
			<Breadcrumbs />
		</nav>
	</section>
</header>

<style>
	header {
		background: var(--mongo-green);
		color: #fff;
	}

	header .nav-flex-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	header .nav-flex-wrapper .header-left {
		padding: 1rem 0;
	}

	header .nav-flex-wrapper .header-left a {
		color: #fff;
		border: 0;
		font-weight: 700;
		font-size: 1.3rem;
	}
</style>
