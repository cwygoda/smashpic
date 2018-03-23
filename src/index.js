import './integrations/release'
import './integrations/sentry'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider as Redux } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import App from './app'
import store, { history } from './store'
import analyticsListener from './integrations/analytics'
import theme from './theme'

history.listen(analyticsListener)

const root = document.getElementById('root')
const load = () => render((
  <AppContainer>
    <Redux store={store}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <App name='SmashPic' />
        </MuiThemeProvider>
      </Router>
    </Redux>
  </AppContainer>
), root)

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./app', load)
}

load()
