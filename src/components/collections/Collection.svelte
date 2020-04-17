<script>
  import filesize from '../../lib/filesize';

  export let collection;
  export let database;
  export let server;

  const size = filesize(collection.size);
</script>

<div class="generic-list">
  <div class="name">
    <a href={`/browse/${server}/${database}/${collection.name}`}>
      { collection.name }
    </a>
    <small class="additional-info">
      <strong>Size:</strong> {size},
      <strong>Documents:</strong> {collection.count}
    </small>
  </div>
</div>
