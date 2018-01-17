exports.config = {
  bundles: [
    { components: ['app-charts'] },
  ],
  collections: [
    { name: '@stencil/router' },
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
