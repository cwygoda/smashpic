import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { smashrunToken } from '../../api/smashrun/selectors'
import Route from './Route'

export default withRouter(connect(
  state => ({
    token: smashrunToken(state),
  })
)(Route))
