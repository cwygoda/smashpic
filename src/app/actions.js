import { createAction } from 'redux-actions'
import { SET_AUTH_REFERER, SET_TOKEN } from './constants'

export const setAuthReferer = createAction(SET_AUTH_REFERER)
export const setToken = createAction(SET_TOKEN)
