import { connect } from 'react-redux'
import Welcome from './Welcome'

export default connect(
  state => ({
    firstName: null,
  })
)(Welcome)
