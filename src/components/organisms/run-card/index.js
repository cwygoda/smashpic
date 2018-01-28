import Card, { CardContent } from 'material-ui/Card'
import { bool, instanceOf, number, oneOfType, string } from 'prop-types'
import DateDisplay from '../../atoms/date-display'
import Distance from '../../atoms/distance'
import Duration from '../../atoms/duration'
import Track from '../../molecules/track'

// TODO: Test
const RunCard = ({ date, distance, distanceUnit, duration, id, track }) => {
  return (
    <Card>
      <CardContent>
        <div style={{ height: '100px' }}>
          <Track color='black' track={track} width={2} />
        </div>
        <DateDisplay date={date} /><span> · </span>
        <Distance unit={distanceUnit} value={distance} /> in <Duration value={duration} />
      </CardContent>
    </Card>
  )
}

RunCard.propTypes = {
  date: string.isRequired,
  distance: number.isRequired,
  distanceUnit: Distance.propTypes.unit,
  duration: number.isRequired,
  id: number.isRequired,
  track: oneOfType([
    bool,
    string,
    instanceOf(Error),
  ]),
}

export default RunCard
