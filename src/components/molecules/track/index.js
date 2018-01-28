import { CircularProgress } from 'material-ui/Progress'
import ErrorIcon from 'material-ui-icons/ErrorOutline'
import { bool, instanceOf, number, oneOfType, string } from 'prop-types'
import TrackSvg from '../../atoms/track-svg'

const Track = ({ color, track, width }) => {
  if (typeof track === 'undefined' || track === true) {
    return <CircularProgress />
  }
  if (track instanceof Error) {
    return <ErrorIcon />
  }
  return <TrackSvg color={color} track={track} width={width} />
}

Track.propTypes = {
  color: string.isRequired,
  track: oneOfType([
    bool,
    instanceOf(Error),
    string,
  ]),
  width: number.isRequired,
}

export default Track
