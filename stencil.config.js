exports.config = {
  bundles: [
    { components: ['app-charts', 'app-charts-events-form'] },
  ],
  collections: [
    { name: '@stencil/router' },
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
