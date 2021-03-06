module.exports = {
  options: {
    tests: 'src'
  },
  use: [
    [
      '@neutrinojs/standardjs',
      {
        eslint: {
          globals: [
            'mockStore',
          ],
          plugins: ['import'],
          baseConfig: {
            extends: [
              'plugin:import/errors',
              'plugin:import/warnings',
              'plugin:react/recommended'
            ],
          },
          rules: {
            'comma-dangle': ['error', 'always-multiline'],
            'import/order': 'error',
          },
        },
      },
    ], [
      '@neutrinojs/react',
      {
        publicPath: '/',
        html: {
          title: 'smashpic',
          scripts: [
            {
              src: 'https://www.google-analytics.com/analytics.js',
              async: undefined,
            }
          ],
        },
        env: [
          'ANALYTICS_ID',
          'CI_COMMIT',
          'CI_TAG',
          'SENTRY_DSN',
        ],
      },
    ], [
      '@neutrinojs/jest',
      {
        setupTestFrameworkScriptFile: '<rootDir>/test-setup.js',
      },
    ],
    neutrino => {
      const sourceMapSetting = process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map'
      neutrino.config.devtool(sourceMapSetting)
    },
  ],
}
