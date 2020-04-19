<script>
  import { createEventDispatcher } from 'svelte';

  import createParams from '@/lib/createParams';

  export let q = '{}';
  export let sort = '';
  export let project = '{}';
  export let limit = 20;
  export let skip = 0;

  export let server;
  export let database;
  export let collection;

  const dispatch = createEventDispatcher();

  function handleFormSubmit(e) {
    e.preventDefault();

    q = e.target.q.value;
    sort = e.target.sort.value;
    project = e.target.project.value;
    limit = e.target.limit.value;
    skip = e.target.skip.value;

    const params = { q, sort, project, limit, skip };
    const queryParams = createParams(params);

    const url = `/browse/${server}/${database}/${collection}?${queryParams.toString()}`;
    return dispatch('update', { url, params });
  }

  function handleCancelClick(e) {
    e.preventDefault();
    return dispatch('cancel');
  }
</script>

<section class="filters">
  <form on:submit={handleFormSubmit}>
    <div class="input-group">
      <label for="q">Query:</label>
      <input name="q" id="q" autocomplete="off" spellcheck="false" value={q}>
    </div>

    <div class="input-group">
      <label for="sort">Sort:</label>
      <input name="sort" id="sort" autocomplete="off" spellcheck="false" value={sort}>
    </div>

    <div class="input-group">
      <label for="project">Project:</label>
      <input name="project" id="project" autocomplete="off" spellcheck="false" value={project}>
    </div>

    <div class="input-group">
      <label for="limit">Limit:</label>
      <input type="number" name="limit" id="limit" autocomplete="off" min="0" value={limit}>
    </div>

    <div class="input-group">
      <label for="skip">Skip:</label>
      <input type="number" name="skip" id="skip" autocomplete="off" min="0" value={skip}>
    </div>

    <div class="input-group submit-button">
      <button type="submit">Apply Filters</button>
      <button on:click={handleCancelClick}>Cancel</button>
    </div>
  </form>
</section>

<style>
  section.filters {
    padding: 2em;
    margin: 1em 0;
    background: #323232;
  }

  section.filters .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  section.filters .input-group label {
    width: 120px;
    margin-bottom: 0;
  }

  section.filters .input-group input {
    font-family: 'Courier New', monospace;
  }

  section.filters .input-group.submit-button {
    display: block;
    margin-top: 2em;
    text-align: center;
  }
</style>
