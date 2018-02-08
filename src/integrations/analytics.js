export default (location) => {
  if (!global.ga) {
    return
  }

  global.ga('set', 'page', location.pathname)
  global.ga('send', 'pageview')
}
