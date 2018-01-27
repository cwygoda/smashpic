import { Component } from 'react'
import { Switch } from 'react-router-dom'
import { func, string } from 'prop-types'
import Welcome from '../components/pages/welcome'
import NotFound from '../components/pages/notfound'
import Run from '../components/pages/run'
import AuthSmashrun from '../components/pages/auth-smashrun'
import Route from './route'

export default class App extends Component {
  static propTypes = {
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
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/run/:id(\d+)?' private component={Run} />
          <Route path='/auth/smashrun' component={AuthSmashrun} />
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
