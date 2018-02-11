import freeze from 'deep-freeze'
import reducer, { initialState as _initialState } from './reducer'
import * as constants from './constants'

const initialState = freeze(_initialState)

describe('Geonames reducer', () => {
  describe('FETCH_RUNS handler', () => {
    it('should store running fetch', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH,
        payload: {
          running: true,
          lat: 53,
          lon: 13,
          zoom: 6,
        },
      })
      const expected = {
        ...initialState,
        running: true,
        lat: 53,
        lon: 13,
        zoom: 6,
      }
      expect(nextState).toEqual(expected)
    })

    it('should store fetched result', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH,
        payload: {
          running: false,
          city: 'Berlin',
          country: 'Deutschland',
        },
      })
      const expected = {
        ...initialState,
        city: 'Berlin',
        country: 'Deutschland',
      }
      expect(nextState).toEqual(expected)
    })

    it('should store exception', () => {
      const nextState = reducer(undefined, {
        type: constants.FETCH,
        payload: Error('Uh-Oh'),
        error: true,
      })
      const expected = {
        ...initialState,
        error: Error('Uh-Oh'),
      }
      expect(nextState).toEqual(expected)
    })
  })
})
