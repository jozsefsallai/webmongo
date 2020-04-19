<script>
  import { createEventDispatcher } from 'svelte';

  export let skip = 0;
  export let limit = 20;
  export let total;

  skip = parseInt(skip, 10);
  limit = parseInt(limit, 10);
  total = parseInt(total, 10);

  const dispatch = createEventDispatcher();

  $: displayPrev = skip > 0;
  $: displayNext = skip + limit < total;

  $: from = skip + 1;
  $: to = skip + limit < total ? skip + limit : total;

  function next() {
    skip = skip + limit;
    return dispatch('update', { skip });
  }

  function prev() {
    skip = skip - limit;
    return dispatch('update', { skip });
  }
</script>

<section class="pagination">
  <div class="prev">
    {#if displayPrev}
      <button on:click={prev}>Previous</button>
    {/if}
  </div>
  <div class="current">
    { from } - { to } / { total }
  </div>
  <div class="next">
    {#if displayNext}
      <button on:click={next}>Next</button>
    {/if}
  </div>
</section>

<style>
  .pagination {
    padding: 1em;
    margin: 1em 0;
    background: #121212;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pagination .current {
    font-size: .8rem;
  }
</style>
