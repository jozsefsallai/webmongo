<script>
  import Server from './Server.svelte';

  export let servers;
  export let serverIDs;
</script>

<div class="server-list">
  {#each serverIDs as id}
    <Server server={servers[id]} {id} />
  {/each}
</div>
