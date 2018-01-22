import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { number, string } from 'prop-types'
import './App.css'

const Welcome = ({ name }) =>
  <Fragment>
    <h1>Welcome to {name}</h1>
    <Link to='/run'>Go run</Link>
  </Fragment>

Welcome.propTypes = {
  name: string.isRequired,
}

const RunPage = ({ id }) => {
  return (
    <Fragment>
      <h1>Run {id}</h1>
      <Link to='/run/1'>Go run 1</Link>
      <Link to='/run/a'>Go run a</Link>
    </Fragment>
  )
}

RunPage.propTypes = {
  id: number,
}

const Run = connect(
  (state, props) => ({
    id: props.match.params.id !== undefined ? parseInt(props.match.params.id) : null,
  })
)(RunPage)

const NotFound = () => <h1>What you were looking has run off trail and can not be found</h1>

export default class App extends Component {
  static propTypes = {
    name: string.isRequired,
  }

  render () {
    const { name } = this.props
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' render={props => <Welcome name={name} {...props} />} />
          <Route path='/run/:id(\d+)?' component={Run} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    )
  }
}
