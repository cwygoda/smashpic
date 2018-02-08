import Raven from 'raven-js'

if (process.env.SENTRY_DSN) {
  Raven.config(process.env.SENTRY_DSN, {
    release: process.env.CI_TAG || process.env.CI_COMMIT,
  }).install()
}
