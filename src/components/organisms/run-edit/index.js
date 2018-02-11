import { connect } from 'react-redux'
import { fetchRun, fetchRunTrack } from '../../../api/smashrun/actions'
import { run, runStatus, user, tracks } from '../../../api/smashrun/selectors'
import { fetch as geocode } from '../../../api/geonames/actions'
import { city, country } from '../../../api/geonames/selectors'
import RunEdit from './RunEdit'

export default connect(
  (state, props) => {
    const { id } = props
    return {
      city: city(state),
      country: country(state),
      distanceUnit: user(state).unitDistance,
      id,
      run: run(state),
      runStatus: runStatus(state),
      track: tracks(state)[id] || null,
    }
  }, {
    fetchRun,
    fetchRunTrack,
    geocode,
  }
)(RunEdit)
