import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NAME } from '../constants'
import Route from './Route'

export default withRouter(connect(
  state => ({
    token: state[NAME].smashrunToken,
  })
)(Route))
