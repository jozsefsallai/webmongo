<script>
  import hljs from 'highlight.js/lib/highlight';
  import json from 'highlight.js/lib/languages/json';
  import 'highlight.js/styles/monokai.css';

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
    margin-bottom: 1.5em;
  }

  :global(code) {
    white-space: pre-wrap;
    background: #333 !important;
  }
</style>
