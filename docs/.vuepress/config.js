module.exports = {
  title: 'WebMongo Documentation',
  description: 'The official documentation and user guide of the WebMongo app',
  base: '/docs/',
  dest: 'static/docs',
  head: [
    [ 'link', { rel: 'icon', href: '/favicon.ico' } ]
  ],
  themeConfig: {
    sidebar: [
      '/',
      '/adding-servers',
      '/deployment'
    ],
    repo: 'jozsefsallai/webmongo',
    repoLabel: 'Contribute to the docs!',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help improve this page!',
    smoothScroll: true
  }
};
