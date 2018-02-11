import { handleActions } from 'redux-actions'
import { FETCH } from './constants'

export const initialState = {
  running: false,
  error: null,
  lat: null,
  lon: null,
  zoom: null,
  city: null,
  country: null,
}

const handlers = {
  [FETCH]: {
    next: (state, { payload: { running, lat = state.lat, lon = state.lon, zoom = state.zoom, city = state.city, country = state.country } }) => ({
      ...state,
      running,
      lat,
      lon,
      zoom,
      city,
      country,
    }),
    throw: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
}

export default handleActions(handlers, initialState)
