import { createAction } from 'redux-actions'
import { FETCH } from './constants'
import * as client from './client'

export const fetchAction = createAction(FETCH)

export const fetch = (lat, lon, zoom = 6) => async (dispatch, getState) => {
  dispatch(fetchAction({ running: true, lat, lon, zoom }))
  try {
    const rv = await client.fetch(lat, lon, zoom)
    const data = rv.data.geonames.length
      ? {
        city: rv.data.geonames[0].name,
        country: rv.data.geonames[0].countryName,
      }
      : {
        city: null,
        country: null,
      }
    dispatch(fetchAction({
      running: false,
      ...data,
    }))
  } catch (e) {
    dispatch(fetchAction(e))
  }
}
