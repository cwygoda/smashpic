import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware, routerReducer as router } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { NAME as appName } from './app/constants'
import appReducer from './app/reducer'
import { NAME as smashrunName } from './api/smashrun/constants'
import smashrunReducer from './api/smashrun/reducer'

const history = createHistory()
const middleWares = [
  thunk,
  routerMiddleware(history),
]

const enableReduxDevTools = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const enhancers = enableReduxDevTools ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
const reducer = combineReducers({
  [appName]: appReducer,
  [smashrunName]: smashrunReducer,
  router,
})
const initialState = {}
const store = createStore(reducer, initialState, enhancers(
  applyMiddleware(...middleWares)
))

export { history }
export default store
