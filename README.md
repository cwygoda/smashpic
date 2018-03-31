![Hello runner, let's go](preview.jpg)

# SmashPic

With SmashPic you can overlay data from your run logged at [Smashrun](https://smashrun.com) on any picture you've taken at your hopefully beautiful running location and then share the result.

Currently only downloading the result and manual sharing is possible, but one of the roadmap items is enabling sharing directly to Facebook.

## CI [![Build Status](https://travis-ci.org/cwygoda/smashpic.svg?branch=feature%2Ftravis-ci)](https://travis-ci.org/cwygoda/smashpic)

SmashPic is using [Travis CI](https://travis-ci.org/cwygoda/smashpic) to automatically test, build and deploy.

### Deployments

* [Canary](https://canary.smashpic.io/): All commits on `master` branch will be tested, build and deployed
* [Live](https://smashpic.io/): Tagged commits will also be tested, build and deployed

### Releasing

To create a new version, use the `npm version major|minor|patch` command.

## Error Monitoring

…is done using Sentry: [Canary](https://sentry.io/christian-wygoda/smashpic-canary/), [Live](https://sentry.io/christian-wygoda/smashpic-live/).

## Analytics

…is done using Google Analytics: [Canary](https://analytics.google.com/analytics/web/#/embed/report-home/a112185776w172987022p172422989/), [Live](https://analytics.google.com/analytics/web/#embed/report-home/a112185776w167237635p167506675/).
