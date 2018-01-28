import { connect } from 'react-redux'
import { fetchRuns, fetchRunTrack } from '../../../api/smashrun/actions'
import { runs, runsStatus, user, tracks } from '../../../api/smashrun/selectors'
import RunList from './RunList'

export default connect(
  (state) => ({
    distanceUnit: user(state).unitDistance,
    runs: runs(state),
    runsStatus: runsStatus(state),
    tracks: tracks(state),
  }), {
    fetchRuns,
    fetchRunTrack,
  }
)(RunList)
