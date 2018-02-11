import { create } from 'axios'

export const client = create({
  baseURL: 'https://secure.geonames.org/',
})

export const fetch = (lat, lng, zoom = 6) => client.get('findNearbyPlaceNameJSON', {
  params: {
    lat,
    lng,
    username: 'smashpic',
    lang: 'local',
  },
})
