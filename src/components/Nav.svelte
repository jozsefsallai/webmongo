<script>
	export let segment;
</script>

<nav>
	<section class="mid nav-flex-wrapper">
		<div class="header-lefter">
			<a aria-current="{segment === undefined ? 'page' : undefined}" href=".">WebMongo</a>
		</div>
	</section>
</nav>

<style>
	nav {
		background: var(--mongo-green);
		color: #fff;
	}

	nav .nav-flex-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	nav .nav-flex-wrapper .header-lefter {
		padding: 1rem 0;
	}

	nav .nav-flex-wrapper .header-lefter a {
		color: #fff;
		border: 0;
		font-weight: 700;
		font-size: 1.3rem;
	}
</style>
