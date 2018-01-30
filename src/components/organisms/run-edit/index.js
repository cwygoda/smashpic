import { connect } from 'react-redux'
import { fetchRun, fetchRunTrack } from '../../../api/smashrun/actions'
import { run, runStatus, user, tracks } from '../../../api/smashrun/selectors'
import RunEdit from './RunEdit'

export default connect(
  (state, props) => {
    const { id } = props
    return {
      distanceUnit: user(state).unitDistance,
      id,
      run: run(state),
      runStatus: runStatus(state),
      track: tracks(state)[id] || null,
    }
  }, {
    fetchRun,
    fetchRunTrack,
  }
)(RunEdit)
