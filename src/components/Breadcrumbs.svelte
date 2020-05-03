<script>
  import { breadcrumbs } from '@/state/store';

  let breadcrumbsList;

  const unsubscribe = breadcrumbs.subscribe(value => {
    breadcrumbsList = value;
  });
</script>

{#if breadcrumbsList && breadcrumbsList.length}
  {#each breadcrumbsList as breadcrumb, idx}
    <span class="breadcrumb">
      {#if breadcrumb.url === '/about'}
        <a href={breadcrumb.url}>{breadcrumb.label}</a>
      {:else}
        {#if idx < breadcrumbsList.length - 1 || breadcrumb.url === '/about'}
          <a href={breadcrumb.url}>{breadcrumb.label}</a> <span>/</span>
        {:else}
          <strong>{breadcrumb.label}</strong>
        {/if}
      {/if}
    </span>
  {/each}
{/if}

<style>
  .breadcrumb a {
    color: #fff;
  }

  .breadcrumb a:hover {
    color: #ccc;
  }

  .breadcrumb span {
    color: #ccc;
    vertical-align: middle;
    font-size: .8rem;
  }
</style>
