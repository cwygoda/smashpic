import freeze from 'deep-freeze'
import reducer, { initialState as _initialState } from './reducer'
import * as constants from './constants'

const initialState = freeze(_initialState)

describe('App reducer', () => {
  // TODO: Test LocalStorage behavior
  it('should store auth referer', () => {
    const referer = '/my/funny/path'
    const nextState = reducer(undefined, { type: constants.SET_AUTH_REFERER, payload: referer })
    const expected = { ...initialState, authReferer: referer }
    expect(nextState).toEqual(expected)
  })
})
