<script>
  import ObjectData from './ObjectData.svelte';

  export let doc;
  // export let collection;
  // export let database;
  // export let server;
</script>

<div class="generic-list document-list">
  <div class="name">{doc._id}</div>
  <div class="actions">
    <a href="javascript:;">Edit</a>
    <a href="javascript:;">Delete</a>
  </div>
</div>

<ObjectData content={doc} />

<style>
  .document-list {
    border-top: 3px solid #333;
  }
</style>
