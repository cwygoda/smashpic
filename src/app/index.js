import { connect } from 'react-redux'
import { fetchUserDetails } from '../api/smashrun/actions'
import { smashrunToken } from '../api/smashrun/selectors'
import App from './App'

export default connect(
  state => ({
    token: smashrunToken(state),
  }), {
    fetchUserDetails,
  }
)(App)
