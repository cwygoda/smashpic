const ratios = {
  'k': { label: 'km', ratio: 1.0 },
  'm': { label: 'mi', ratio: 1.6 },
}

const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)

export const formatDistance = (distance, unit) => {
  const { label, ratio } = ratios[unit]
  const value = round(distance / ratio, 1)

  return `${value}${label}`
}

const pad = (val) => `${val}`.padStart(2, '0')

export const formatDuration = (value) => {
  const totalSeconds = Math.floor(value)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
  const seconds = totalSeconds - (hours * 3600) - (minutes * 60)

  let text = ''
  if (hours) {
    text = `${pad(hours)}:`
  }
  return `${text}${pad(minutes)}:${pad(seconds)}`
}
