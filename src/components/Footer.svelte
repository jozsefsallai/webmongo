<script>
  import Icon from 'fa-svelte';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';

  import { themeSetting } from '@/state/store';

  let theme;

  const unsubscribe = themeSetting.subscribe(value => {
    theme = value;
  });

  $: themeSwitcherLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';

  function switchTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.replace(theme, newTheme);
    themeSetting.set(newTheme);
    localStorage.setItem('theme', newTheme);
  }
</script>

<footer>
  <p>
    Made with <span style="color: #df2540">❤</span> by
    <a href="https://github.com/jozsefsallai" target="_blank" rel="noreferrer noopener">@jozsefsallai</a>.<br />
    <a href="https://github.com/jozsefsallai/webmongo" target="_blank" rel="noreferrer noopener">
      <Icon icon={faGithub} /> GitHub
    </a>
  </p>
  <p><a href="/docs">Read the Documentation</a> &middot; <span class="fake-link" on:click={switchTheme}>{themeSwitcherLabel}</span></p>
</footer>

<style>
  footer {
    padding: 3em 1em;
    color: #777;
    font-size: .8rem;
    text-align: center;
  }
</style>
