import { handleActions } from 'redux-actions'
import store from 'store'
import { FETCH_RUN, FETCH_RUNS, FETCH_RUN_TRACK, FETCH_USER, SET_TOKEN } from './constants'

const storage = store.namespace('smashpic')

export const initialState = {
  runs: [],
  runsStatus: false,
  run: null,
  runStatus: false,
  smashrunToken: storage.get('smashrunToken', null),
  tracks: {},
  user: {
    firstName: null,
    unitDistance: 'k',
  },
  userStatus: false,
}

const handlers = {
  [FETCH_RUNS]: {
    next: (state, { payload: { running, runs = [] } }) => ({
      ...state,
      runs,
      runsStatus: running,
    }),
    throw: (state, { payload: error }) => ({
      ...state,
      runs: [],
      runsStatus: error,
    }),
  },

  [FETCH_RUN]: {
    next: (state, { payload: { running, run = null } }) => ({
      ...state,
      run,
      runStatus: running,
    }),
    throw: (state, { payload: error }) => ({
      ...state,
      run: null,
      runStatus: error,
    }),
  },

  [FETCH_RUN_TRACK]: {
    next: (state, { payload: track, meta: { id } }) => ({
      ...state,
      tracks: {
        ...state.tracks,
        [id]: track,
      },
    }),
    throw: (state, { payload: error, meta: { id } }) => ({
      ...state,
      tracks: {
        ...state.tracks,
        [id]: error,
      },
    }),
  },

  [FETCH_USER]: {
    next: (state, { payload: { running: userStatus, firstName, unitDistance } }) => {
      return {
        ...state,
        user: {
          firstName: firstName || state.user.firstName,
          unitDistance: unitDistance || state.user.unitDistance,
        },
        userStatus,
      }
    },
    throw: (state, { payload: error }) => ({
      ...state,
      user: { ...initialState.user },
      userStatus: error,
    }),
  },
  [SET_TOKEN]: (state, { payload: smashrunToken }) => ({
    ...state,
    smashrunToken: storage.set('smashrunToken', smashrunToken),
  }),
}

export default handleActions(handlers, initialState)
