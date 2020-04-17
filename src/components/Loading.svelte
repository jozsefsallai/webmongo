<section class="loading-container">
  <div class="loading-spinner"></div>
</section>

<style>
  .loading-container {
    padding: 1em;
    text-align: center;
  }

  .loading-spinner {
    display: inline-block;
    margin: 0 auto;
  }

  .loading-spinner:after {
    display: block;
    width: 8em;
    height: 8em;
    content: ' ';
    border-radius: 50%;
    border: 1em solid;
    border-color: var(--mongo-green) transparent var(--mongo-green) transparent;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
