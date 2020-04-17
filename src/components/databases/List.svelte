<script>
  import Database from './Database.svelte';

  export let databases;
  export let server;
</script>

<div class="database-list">
  {#each databases as database}
    <Database {server} {database} />
  {/each}
</div>
