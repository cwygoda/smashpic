import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider as Redux } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import App from './app'
import store, { history } from './store'

const root = document.getElementById('root')
const load = () => render((
  <AppContainer>
    <Redux store={store}>
      <Router history={history}>
        <App name='SmashPic' />
      </Router>
    </Redux>
  </AppContainer>
), root)

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./app', load)
}

load()
