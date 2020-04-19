<script>
  export let callback;
  export let promise = true;

  let loading = false;

  async function runCallback(e) {
    loading = true;

    if (promise) {
      await callback(e);
    } else {
      callback(e);
    }

    loading = false;
  }
</script>

<button
  class={loading ? 'loading' : undefined}
  type="submit"
  on:click={runCallback}
>
  <slot></slot>
</button>
