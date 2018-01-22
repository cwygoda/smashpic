import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { number } from 'prop-types'
import Welcome from '../components/pages/welcome'
import NotFound from '../components/pages/notfound'

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

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/run/:id(\d+)?' component={Run} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    )
  }
}
