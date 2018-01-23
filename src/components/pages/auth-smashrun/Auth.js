import querystring from 'querystring'
import { Component } from 'react'
import { func, object, shape, string } from 'prop-types'

// TODO: Test

export default class Auth extends Component {
  static propTypes = {
    auth: func.isRequired,
    authReferer: string,
    history: object.isRequired,
    location: shape({
      state: shape({
        from: shape({
          pathname: string.isRequired,
        }),
      }),
    }),
    setAuthReferer: func.isRequired,
    setToken: func.isRequired,
    token: string,
    unauth: func.isRequired,
  }

  static defaultProps = {
    authReferer: '/',
  }

  componentWillMount () {
    if (window.location.hash) {
      const attributes = querystring.parse(window.location.hash.substr(1))
      if (attributes.access_token && attributes.token_type === 'bearer') {
        const token = attributes.access_token.replace(/ /g, '+')
        this.props.setToken(token)
        const referer = this.props.authReferer || '/'
        this.props.history.push(referer)
        return
      }
    }

    let referer = '/'
    try {
      referer = this.props.location.state.from.pathname
    } catch (e) {}
    this.props.setAuthReferer(referer)
  }

  render () {
    return (
      <div>
        {this.props.token &&
          <div onClick={this.props.unauth}>Unauthenticate</div>}
        {!this.props.token &&
          <div onClick={this.props.auth}>Authenticate</div>}
      </div>
    )
  }
}
