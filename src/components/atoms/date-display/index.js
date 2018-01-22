import moment from 'moment'
import { instanceOf, oneOfType, string } from 'prop-types'

const DateDisplay = ({ date }) => moment(date).format('MMM Do, k:mm')

DateDisplay.propTypes = {
  date: oneOfType([
    instanceOf(Date),
    string,
  ]).isRequired,
}

export default DateDisplay
