import querystring from 'querystring'
import { Component } from 'react'
import { func, object, shape, string } from 'prop-types'
import Button from 'material-ui/Button'

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
          <Button variant='raised' onClick={this.props.unauth}>Unauthenticate</Button>}
        {!this.props.token &&
          <Button variant='raised' onClick={this.props.auth}>Authenticate</Button>}
      </div>
    )
  }
}
