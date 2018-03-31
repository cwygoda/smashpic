if (process.env.ANALYTICS_ID) {
  const gaProperty = process.env.ANALYTICS_ID
  const disable = `ga-disable-${gaProperty}`
  if (document.cookie.indexOf(`${disable}=true`) > -1) {
    window[disable] = true
  }

  const ga = global.ga = global.ga || function () {
    (ga.q = ga.q || []).push(arguments)
  }
  ga.l = +new Date()
  ga('create', gaProperty, 'auto')
  ga('set', 'anonymizeIp', true)
  ga('send', 'pageview')
}

export default (location) => {
  if (!global.ga) {
    return
  }

  global.ga('set', 'page', location.pathname)
  global.ga('send', 'pageview')
}

export const optOut = () => {
  const disable = `ga-disable-${process.env.ANALYTICS_ID}`
  document.cookie = disable + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
  window[disable] = true
  alert('Google Analytics Tracking has been disabled')
}
