import { Component } from 'react'
import { Switch } from 'react-router-dom'
import CssBaseline from 'material-ui/CssBaseline'
import { withStyles } from 'material-ui/styles'
import { func, shape, string } from 'prop-types'
import Welcome from '../components/pages/welcome'
import NotFound from '../components/pages/notfound'
import Run from '../components/pages/run'
import AuthSmashrun from '../components/pages/auth-smashrun'
import Privacy from '../components/pages/privacy'
import Route from './route'

import 'typeface-roboto'

const styles = theme => ({
  '@global': {
    'html, body, #root': {
      height: '100%',
      fontFamily: 'Roboto, sans-serif',
    },
    html: {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
  },
  root: {
    height: '100%',
  },
})

class App extends Component {
  static propTypes = {
    classes: shape({
      root: string.isRequired,
    }).isRequired,
    fetchUserDetails: func.isRequired,
    token: string,
  }

  componentDidMount () {
    this.fetchUser(this.props.token)
  }

  componentWillReceiveProps (next) {
    if (next.token !== this.props.token) {
      this.fetchUser((next.token))
    }
  }

  render () {
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/run/:id(\d+)?' private component={Run} />
          <Route path='/auth/smashrun' component={AuthSmashrun} />
          <Route path='/privacy' component={Privacy} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    )
  }

  fetchUser (token) {
    const { fetchUserDetails } = this.props
    if (token) {
      fetchUserDetails()
    }
  }
}

export default withStyles(styles)(App)
