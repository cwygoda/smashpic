import { connect } from 'react-redux'
import { user as userSelector } from '../../../api/smashrun/selectors'
import Welcome from './Welcome'

export default connect(
  state => {
    const user = userSelector(state)
    return {
      firstName: user && user.firstName ? user.firstName : undefined,
    }
  }
)(Welcome)
