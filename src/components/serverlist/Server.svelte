<script>
export let server;
export let id;
</script>

<div class="server">
  <div class="name">
    <a href={`/server/${id}`}>
      {server.name}
    </a>
  </div>
  <div class="actions">
    <a href={`/delete/${id}`}>Delete</a>
  </div>
</div>

<style>
  .server {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .8em 1em;
    background: #121212;
    border-bottom: 3px solid #333;
  }

  .server:first-child {
    border-top: 3px solid #333;
  }

  .server:nth-child(2n) {
    background: #1a1a1a;
  }
</style>
