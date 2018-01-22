import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware, routerReducer as router } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { NAME as appName } from './app/constants'
import appReducer from './app/reducer'

const history = createHistory()
const middleWares = [
  routerMiddleware(history),
]

const enableReduxDevTools = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const enhancers = enableReduxDevTools ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
const reducer = combineReducers({
  [appName]: appReducer,
  router,
})
const initialState = {}
const store = createStore(reducer, initialState, enhancers(
  applyMiddleware(...middleWares)
))

export { history }
export default store
