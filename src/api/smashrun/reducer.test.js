import freeze from 'deep-freeze'
import reducer, { initialState as _initialState } from './reducer'
import * as constants from './constants'

const initialState = freeze(_initialState)

describe('SmashRun reducer', () => {
  it('should store token', () => {
    const token = 'mYtOkEn'
    const nextState = reducer(undefined, { type: constants.SET_TOKEN, payload: token })
    const expected = { ...initialState, smashrunToken: token }
    expect(nextState).toEqual(expected)
  })

  describe('FETCH_RUNS handler', () => {
    it('should store running fetch', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUNS,
        payload: {
          running: true,
        },
      })
      const expected = {
        ...initialState,
        runsStatus: true,
      }
      expect(nextState).toEqual(expected)
    })

    it('should store fetched runs', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUNS,
        payload: {
          running: false,
          runs: [{ id: 1 }],
        },
      })
      const expected = {
        ...initialState,
        runs: [{ id: 1 }],
      }
      expect(nextState).toEqual(expected)
    })

    it('should store exception', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUNS,
        payload: Error('Uh-Oh'),
        error: true,
      })
      const expected = {
        ...initialState,
        runs: [],
        runsStatus: Error('Uh-Oh'),
      }
      expect(nextState).toEqual(expected)
    })
  })

  describe('FETCH_RUN handler', () => {
    it('should store running fetch', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUN,
        payload: {
          running: true,
        },
      })
      const expected = {
        ...initialState,
        runStatus: true,
      }
      expect(nextState).toEqual(expected)
    })

    it('should store fetched run', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUN,
        payload: {
          running: false,
          run: { id: 1 },
        },
      })
      const expected = {
        ...initialState,
        run: { id: 1 },
      }
      expect(nextState).toEqual(expected)
    })

    it('should store exception', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUN,
        payload: Error('Uh-Oh'),
        error: true,
      })
      const expected = {
        ...initialState,
        run: null,
        runStatus: Error('Uh-Oh'),
      }
      expect(nextState).toEqual(expected)
    })
  })

  describe('FETCH_RUN_TRACK handler', () => {
    it('should store fetched track', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUN_TRACK,
        payload: 'track',
        meta: {
          id: 1,
        },
      })
      const expected = {
        ...initialState,
        tracks: {
          1: 'track',
        },
      }
      expect(nextState).toEqual(expected)
    })

    it('should store exception', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_RUN_TRACK,
        error: true,
        payload: Error('Uh-Oh'),
        meta: {
          id: 1,
        },
      })
      const expected = {
        ...initialState,
        tracks: {
          1: Error('Uh-Oh'),
        },
      }
      expect(nextState).toEqual(expected)
    })
  })

  describe('FETCH_USER handler', () => {
    it('should store running fetch', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_USER,
        payload: {
          running: true,
        },
      })
      const expected = {
        ...initialState,
        userStatus: true,
      }
      expect(nextState).toEqual(expected)
    })

    it('should store fetched user', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_USER,
        payload: {
          running: false,
          firstName: 'Emil',
          unitDistance: 'k',
        },
      })
      const expected = {
        ...initialState,
        user: {
          firstName: 'Emil',
          unitDistance: 'k',
        },
      }
      expect(nextState).toEqual(expected)
    })

    it('should store exception', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH_USER,
        payload: Error('Uh-Oh'),
        error: true,
      })
      const expected = {
        ...initialState,
        userStatus: Error('Uh-Oh'),
      }
      expect(nextState).toEqual(expected)
    })
  })
})
