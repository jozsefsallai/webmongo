<script>
  export let breadcrumbs;
</script>

{#if breadcrumbs && breadcrumbs.length}
  {#each breadcrumbs as breadcrumb}
    <span class="breadcrumb">
      <a href={breadcrumb.url}>{breadcrumb.label}</a>
    </span>
  {/each}
{/if}
