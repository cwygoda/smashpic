if (process.env.ANALYTICS_ID) {
  const ga = global.ga = global.ga || function () {
    (ga.q = ga.q || []).push(arguments)
  }
  ga.l = +new Date()
  ga('create', process.env.ANALYTICS_ID, 'auto')
  ga('send', 'pageview')
}

export default (location) => {
  if (!global.ga) {
    return
  }

  global.ga('set', 'page', location.pathname)
  global.ga('send', 'pageview')
}
