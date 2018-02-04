import 'core-js/modules/es7.string.pad-start'
import { number } from 'prop-types'
import { formatDuration } from '../../../formatters'

const Duration = ({ value }) => formatDuration(value)

Duration.propTypes = {
  value: number.isRequired,
}

export default Duration
