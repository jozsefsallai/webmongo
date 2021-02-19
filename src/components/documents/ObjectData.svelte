<script>
  import hljs from 'highlight.js/lib/core';
  import json from 'highlight.js/lib/languages/json';

  import { themeSetting } from '@/state/store';

  let theme;

  const unsubscribe = themeSetting.subscribe(value => {
    theme = value;
  });

  $: import(`highlight.js/styles/atom-one-${theme}.css`);

  export let content;

  hljs.registerLanguage('json', json);

  const code = document.createElement('code');
  code.className = 'json';
  code.textContent = JSON.stringify(content, null, 2);
  hljs.highlightBlock(code);

  const contentHTML = code.outerHTML;
</script>

<section class="object-data">
  <pre>{@html contentHTML}</pre>
</section>

<style>
  pre {
    margin: 0;
  }
</style>
