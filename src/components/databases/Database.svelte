<script>
  import filesize from '../../lib/filesize';

  export let database;
  export let server;

  const size = filesize(database.sizeOnDisk);
</script>

<div class="generic-list">
  <div class="name">
    <a href={`/server/${server}/db/${database.name}`}>
      {database.name}
    </a>
    <small class="additional-info">
      <strong>Size:</strong> {size}
    </small>
  </div>
</div>
