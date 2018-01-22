import 'core-js/modules/es7.string.pad-start'
import { number } from 'prop-types'

const pad = (val) => `${val}`.padStart(2, '0')

const Duration = ({ value }) => {
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

Duration.propTypes = {
  value: number.isRequired,
}

export default Duration
