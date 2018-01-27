import { connect } from 'react-redux'
import { fetchRuns } from '../../../api/smashrun/actions'
import { runs, runsStatus } from '../../../api/smashrun/selectors'
import RunList from './RunList'

export default connect(
  (state) => ({
    runs: runs(state),
    runsStatus: runsStatus(state),
  }), {
    fetchRuns,
  }
)(RunList)
