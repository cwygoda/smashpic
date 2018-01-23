import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Route from './Route'

export default withRouter(connect(
  state => ({
    token: state.smashrun.token,
  })
)(Route))
