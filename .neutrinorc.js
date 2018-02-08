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
        },
        env: [
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
  ],
}
