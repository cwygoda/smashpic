import url from 'url'
import { connect } from 'react-redux'
import { setAuthReferer, setToken } from '../../../app/actions'
import { NAME } from '../../../app/constants'
import Auth from './Auth'

export default connect(
  (state, props) => ({
    token: state[NAME].token,
    authReferer: state[NAME].authReferer,

    auth: () => {
      const callbackUrl = url.parse(window.location.href)
      callbackUrl.hash = null

      const authUrl = url.parse('https://secure.smashrun.com/oauth2/authenticate')
      authUrl.query = {
        client_id: 'client',
        scope: 'read_activity',
        response_type: 'token',
      }
      authUrl.query.redirect_uri = url.format(callbackUrl)
      window.location = url.format(authUrl)
    },
  }), {
    setAuthReferer,
    setToken,
    unauth: () => setToken(null),
  }
)(Auth)
