import { createAction } from 'redux-actions'
import { smashrunToken } from './selectors'
import { FETCH_RUN, FETCH_RUNS, FETCH_RUN_TRACK, FETCH_USER, NAME, SET_TOKEN } from './constants'
import * as client from './client'

export const setToken = createAction(SET_TOKEN)

export const fetchRunsAction = createAction(FETCH_RUNS)

export const fetchRuns = (count = 3) => async (dispatch, getState) => {
  dispatch(fetchRunsAction({ running: true }))
  const token = smashrunToken(getState())
  try {
    const runs = await client.fetchRuns(token, { count })
    dispatch(fetchRunsAction({
      running: false,
      runs: runs.data.map(run => ({ // TODO: Can this be done using some nifty decomposition?
        id: run.activityId,
        date: run.startDateTimeLocal,
        distance: run.distance,
        duration: run.duration,
      })
      ) }))
  } catch (e) {
    dispatch(fetchRunsAction(e))
  }
}

export const fetchRunAction = createAction(FETCH_RUN)

export const fetchRun = (id) => async (dispatch, getState) => {
  dispatch(fetchRunAction({ running: true }))

  const token = smashrunToken(getState())

  try {
    const { data: run } = await client.fetchRun(token, id)

    dispatch(fetchRunAction({
      running: false,
      run: {
        id: run.activityId,
        date: run.startDateTimeLocal,
        distance: run.distance,
        duration: run.duration,
        lat: run.startLatitude,
        lng: run.startLongitude,
        city: run.city,
      } }))
  } catch (e) {
    dispatch(fetchRunAction(e))
  }
}

export const fetchRunTrackAction = createAction(FETCH_RUN_TRACK, p => p, (p, m) => m)

export const fetchRunTrack = (id, force = false) => async (dispatch, getState) => {
  const tracks = getState()[NAME].tracks
  if (!force && id in tracks && (typeof tracks[id] === 'string')) {
    return
  }

  dispatch(fetchRunTrackAction(true, { id }))

  const token = smashrunToken(getState())

  try {
    const track = await client.fetchRunPolyline(token, id)
    dispatch(fetchRunTrackAction(track.data.polyline, { id }))
  } catch (e) {
    dispatch(fetchRunTrackAction(e, { id }))
  }
}

export const fetchUserAction = createAction(FETCH_USER)

export const fetchUserDetails = () => async (dispatch, getState) => {
  dispatch(fetchUserAction({ running: true }))
  const token = smashrunToken(getState())
  try {
    const results = await client.fetchUser(token)
    const data = {
      firstName: results.data.firstName,
      unitDistance: results.data.unitDistance,
    }
    dispatch(fetchUserAction({ running: false, ...data }))
  } catch (e) {
    dispatch(fetchUserAction(e))
  }
}
