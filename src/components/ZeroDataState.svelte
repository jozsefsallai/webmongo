<script>
  import Icon from 'fa-svelte';
  import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
</script>

<section class="zds">
  <Icon class="zds-icon" icon={faFrownOpen} />
  <slot />
</section>

<style>
  .zds {
    padding: 2em 0;
    display: flex;
    align-items: center;
    color: #888;
  }

  .zds :global(.zds-icon) {
    width: 2.5em;
    height: auto;
    margin-right: 1em;
  }
</style>
