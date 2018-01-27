import { handleActions } from 'redux-actions'
import store from 'store'
import { SET_AUTH_REFERER } from './constants'

const storage = store.namespace('smashpic')

export const initialState = {
  authReferer: storage.get('authReferer', null),
}

const handlers = {
  [SET_AUTH_REFERER]: (state, { payload: authReferer }) => ({
    ...state,
    authReferer: storage.set('authReferer', authReferer),
  }),
}

export default handleActions(handlers, initialState)
