import * as actions from './actions'
import * as constants from './constants'

describe('App actions', () => {
  it('should create SET_AUTH_REFERER action', () => {
    const referer = '/my/funny/path'
    const expected = { type: constants.SET_AUTH_REFERER, payload: referer }
    expect(actions.setAuthReferer(referer)).toEqual(expected)
  })
})
