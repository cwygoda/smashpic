import { handleActions } from 'redux-actions'
import store from 'store'
import { SET_AUTH_REFERER, SET_TOKEN } from './constants'

const storage = store.namespace('smashpic')

export const initialState = {
  authReferer: storage.get('authReferer', null),
  smashrunToken: storage.get('smashrunToken', null),
}

const handlers = {
  [SET_AUTH_REFERER]: (state, { payload: authReferer }) => ({
    ...state,
    authReferer: storage.set('authReferer', authReferer),
  }),
  [SET_TOKEN]: (state, { payload: smashrunToken }) => ({
    ...state,
    smashrunToken: storage.set('smashrunToken', smashrunToken),
  }),
}

export default handleActions(handlers, initialState)
