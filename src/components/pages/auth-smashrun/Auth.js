import querystring from 'querystring'
import { Component } from 'react'
import { func, object, shape, string } from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import AppPage from '../../templates/app-page'

// TODO: Test

const styles = theme => ({
  content: {
    padding: theme.spacing.unit,
    maxWidth: '960px',
    margin: '0 auto',
  },
})

class Auth extends Component {
  static propTypes = {
    auth: func.isRequired,
    authReferer: string,
    classes: shape({
      content: string.isRequired,
    }).isRequired,
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
    const { classes, token } = this.props
    return (
      <AppPage title='Smashrun Authentication'>
        <div className={classes.content}>
          {token && this.renderUnauth()}
          {!token && this.renderAuth()}
        </div>
      </AppPage>
    )
  }

  renderAuth () {
    return (
      <div>
        <p>You need to authenticate at Smashrun to use Smashpic:</p>
        <Button variant='raised' color='primary' onClick={this.props.auth}>Authenticate</Button>
      </div>
    )
  }

  renderUnauth () {
    return (
      <div>
        <p>You are already authenticated at Smashrun. If you want Smashpic to forget your authentication, click below.</p>
        <Button variant='raised' color='primary' onClick={this.props.unauth}>Unauthenticate</Button>
      </div>
    )
  }
}

export default withStyles(styles)(Auth)
