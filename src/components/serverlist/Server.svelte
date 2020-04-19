<script>
  export let server;
  export let id;
</script>

<div class="generic-list">
  <div class="name">
    <a href={`/browse/${id}`}>
      {server.name}
    </a>
  </div>
  <div class="actions">
    <a class="button red-button" href={`/delete/${id}`}>Delete</a>
  </div>
</div>
