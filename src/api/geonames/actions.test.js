import moxios from 'moxios'
import * as actions from './actions'
import * as constants from './constants'
import { client } from './client'

const makeStore = () => mockStore({
  geonames: {
    running: false,
    lat: null,
    lon: null,
    zoom: null,
    city: null,
    country: null,
  },
})

describe('Geonames API actions', () => {
  beforeEach(() => moxios.install(client))
  afterEach(() => moxios.uninstall(client))

  describe('reverse geocoding', () => {
    it('should work', async () => {
      const store = makeStore()
      const results = {
        geonames: [{
          name: 'Berlin',
          countryName: 'Deutschland',
        }],
      }
      const expected = [
        {
          type: constants.FETCH,
          payload: { running: true, lat: 53, lon: 13, zoom: 6 },
        },
        {
          type: constants.FETCH,
          payload: {
            running: false,
            city: 'Berlin',
            country: 'Deutschland',
          },
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 200,
        response: results,
      })

      await store.dispatch(actions.fetch(53, 13))
      expect(store.getActions()).toEqual(expected)
    })

    it('should handle exceptions', async () => {
      const store = makeStore()
      const exception = new Error('Request failed with status code 500')
      const expected = [
        {
          type: constants.FETCH,
          payload: { running: true, lat: 53, lon: 13, zoom: 6 },
        },
        {
          type: constants.FETCH,
          error: true,
          payload: exception,
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 500,
      })

      await store.dispatch(actions.fetch(53, 13))
      expect(store.getActions()).toEqual(expected)
    })
  })
})
