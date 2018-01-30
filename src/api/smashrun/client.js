import { create } from 'axios'

// TODO: Global handle 401, 429

export const client = create({
  baseURL: 'https://api.smashrun.com/v1/my/',
  headers: {
    'content-type': 'application/json',
  },
})

export const fetchRun = (token, id) => client.get(`/activities/${id}`, { params: { access_token: token } })
export const fetchRuns = (token, params) => client.get('/activities/search/briefs', { params: { access_token: token, ...params } })
export const fetchRunPolyline = (token, id) => client.get(`/activities/${id}/polyline`, { params: { access_token: token } })
export const fetchUser = (token) => client.get('/userinfo', { params: { access_token: token } })
