import { number, oneOf } from 'prop-types'

const ratios = {
  'k': { label: 'km', ratio: 1.0 },
  'm': { label: 'mi', ratio: 1.6 },
}

const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)

const Distance = ({ value: val, unit }) => {
  const { label, ratio } = ratios[unit]
  const value = round(val / ratio, 1)

  return `${value}${label}`
}

Distance.propTypes = {
  unit: oneOf(Object.keys(ratios)),
  value: number.isRequired,
}

export default Distance
