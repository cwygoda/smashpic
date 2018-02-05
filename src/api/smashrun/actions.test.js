import moxios from 'moxios'
import * as actions from './actions'
import * as constants from './constants'
import { client } from './client'

const makeStore = () => mockStore({
  smashpic: {
    token: 'mYtOkEn',
  },
  smashrun: {
    tracks: {},
  },
})

describe('SmashRun token actions', () => {
  it('should create SET_TOKEN action', () => {
    const token = 'mYtOkEn'
    const expected = { type: constants.SET_TOKEN, payload: token }
    expect(actions.setToken(token)).toEqual(expected)
  })
})

describe('SmashRun API actions', () => {
  beforeEach(() => moxios.install(client))
  afterEach(() => moxios.uninstall(client))

  describe('fetching runs', () => {
    it('should work', async () => {
      const store = makeStore()
      const runs = [{
        activityId: 1,
        startDateTimeLocal: '2018-01-25T08:54:00+01:00',
        distance: 5,
        duration: 300,
      }]
      const expected = [
        {
          type: constants.FETCH_RUNS,
          payload: { running: true },
        },
        {
          type: constants.FETCH_RUNS,
          payload: {
            running: false,
            runs: [{
              id: 1,
              date: '2018-01-25T08:54:00+01:00',
              distance: 5,
              duration: 300,
            }],
          },
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 200,
        response: runs,
      })

      await store.dispatch(actions.fetchRuns())
      expect(store.getActions()).toEqual(expected)
    })

    it('should handle exceptions', async () => {
      const store = makeStore()
      const exception = new Error('Request failed with status code 500')
      const expected = [
        {
          type: constants.FETCH_RUNS,
          payload: { running: true },
        },
        {
          type: constants.FETCH_RUNS,
          error: true,
          payload: exception,
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 500,
      })

      await store.dispatch(actions.fetchRuns())
      expect(store.getActions()).toEqual(expected)
    })
  })

  describe('fetching run', () => {
    it('should work', async () => {
      const store = makeStore()
      const run = {
        activityId: 1,
        startDateTimeLocal: '2018-01-25T08:54:00+01:00',
        distance: 5,
        duration: 300,
        startLatitude: 0,
        startLongitude: 0,
        city: 'Atlantis',
        country: 'Nowhereland',
      }
      const expected = [
        {
          type: constants.FETCH_RUN,
          payload: { running: true },
        },
        {
          type: constants.FETCH_RUN,
          payload: {
            running: false,
            run: {
              id: 1,
              date: '2018-01-25T08:54:00+01:00',
              distance: 5,
              duration: 300,
              lat: 0,
              lng: 0,
              city: 'Atlantis',
              country: 'Nowhereland',
            },
          },
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 200,
        response: run,
      })

      await store.dispatch(actions.fetchRun(1))
      expect(store.getActions()).toEqual(expected)
    })

    it('should handle exceptions', async () => {
      const store = makeStore()
      const exception = new Error('Request failed with status code 500')
      const expected = [
        {
          type: constants.FETCH_RUN,
          payload: { running: true },
        },
        {
          type: constants.FETCH_RUN,
          error: true,
          payload: exception,
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 500,
      })

      await store.dispatch(actions.fetchRun())
      expect(store.getActions()).toEqual(expected)
    })
  })

  describe('fetching run track', () => {
    const polyline = 'iofwFvwqbM~DqKuEoHxPc`@tH{UmFoI`AsHtGh@|LtJvFtLnDxCo@qBhDCbBiEqCqP{AwBwC_@sCbNeBk@oCqBbC`HeElIaBy@cBdC_@vAm]x}@KP'

    it('should work', async () => {
      const store = makeStore()
      const expected = [
        {
          type: constants.FETCH_RUN_TRACK,
          payload: true,
          meta: { id: 1 },
        },
        {
          type: constants.FETCH_RUN_TRACK,
          payload: polyline,
          meta: { id: 1 },
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 200,
        response: { polyline },
      })

      await store.dispatch(actions.fetchRunTrack(1))
      expect(store.getActions()).toEqual(expected)
    })

    it('should handle exceptions', async () => {
      const store = makeStore()
      const exception = new Error('Request failed with status code 500')
      const expected = [
        {
          type: constants.FETCH_RUN_TRACK,
          payload: true,
          meta: { id: 1 },
        },
        {
          type: constants.FETCH_RUN_TRACK,
          error: true,
          payload: exception,
          meta: { id: 1 },
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 500,
      })

      await store.dispatch(actions.fetchRunTrack(1))
      expect(store.getActions()).toEqual(expected)
    })

    it('should use cached track', async () => {
      const store = makeStore()
      store.getState().smashrun.tracks[1] = polyline
      moxios.stubRequest(/.*/, {
        status: 200,
        response: { polyline },
      })

      await store.dispatch(actions.fetchRunTrack(1))
      expect(store.getActions()).toEqual([])
    })

    it('should ignore cached exception', async () => {
      const store = makeStore()
      store.getState().smashrun.tracks[1] = Error('Uh-Oh')
      moxios.stubRequest(/.*/, {
        status: 200,
        response: { polyline },
      })

      const expected = [
        {
          type: constants.FETCH_RUN_TRACK,
          payload: true,
          meta: { id: 1 },
        },
        {
          type: constants.FETCH_RUN_TRACK,
          payload: polyline,
          meta: { id: 1 },
        },
      ]

      await store.dispatch(actions.fetchRunTrack(1))
      expect(store.getActions()).toEqual(expected)
    })

    it('should ignore cache when forced', async () => {
      const store = makeStore()
      store.getState().smashrun.tracks[1] = polyline
      moxios.stubRequest(/.*/, {
        status: 200,
        response: { polyline },
      })

      const expected = [
        {
          type: constants.FETCH_RUN_TRACK,
          payload: true,
          meta: { id: 1 },
        },
        {
          type: constants.FETCH_RUN_TRACK,
          payload: polyline,
          meta: { id: 1 },
        },
      ]

      await store.dispatch(actions.fetchRunTrack(1, true))
      expect(store.getActions()).toEqual(expected)
    })
  })

  describe('fetching user details', () => {
    it('should work', async () => {
      const store = makeStore()
      const user = {
        firstName: 'Emil',
        unitDistance: 'm',
      }
      const expected = [
        {
          type: constants.FETCH_USER,
          payload: { running: true },
        },
        {
          type: constants.FETCH_USER,
          payload: {
            running: false,
            ...user,
          },
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 200,
        response: user,
      })

      await store.dispatch(actions.fetchUserDetails())
      expect(store.getActions()).toEqual(expected)
    })

    it('should handle exceptions', async () => {
      const store = makeStore()
      const exception = new Error('Request failed with status code 500')
      const expected = [
        {
          type: constants.FETCH_USER,
          payload: { running: true },
        },
        {
          type: constants.FETCH_USER,
          error: true,
          payload: exception,
        },
      ]
      moxios.stubRequest(/.*/, {
        status: 500,
      })

      await store.dispatch(actions.fetchUserDetails())
      expect(store.getActions()).toEqual(expected)
    })
  })
})
