module.exports = {
  use: [
    [
      '@neutrinojs/standardjs',
      {
        eslint: {
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
        html: {
          title: 'smashpic',
        },
      },
    ],
    '@neutrinojs/jest',
  ],
}
