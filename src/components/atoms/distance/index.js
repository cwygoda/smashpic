import { number } from 'prop-types'
import { distanceUnit } from '../../../prop-types'
import { formatDistance } from '../../../formatters'

const Distance = ({ value, unit }) => formatDistance(value, unit)

Distance.propTypes = {
  unit: distanceUnit,
  value: number.isRequired,
}

export default Distance
