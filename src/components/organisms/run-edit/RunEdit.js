import { Component } from 'react'
import { bool, func, instanceOf, number, oneOf, oneOfType, shape, string } from 'prop-types'

export default class RunEdit extends Component {
  static propTypes = {
    distanceUnit: oneOf(['k', 'm']),
    fetchRun: func.isRequired,
    fetchRunTrack: func.isRequired,
    id: number,
    run: shape({
      id: number.isRequired,
      date: string.isRequired,
      distance: number.isRequired,
      duration: number.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
      city: string,
    }),
    runStatus: oneOfType([
      bool,
      instanceOf(Error),
    ]).isRequired,
    track: oneOfType([
      bool,
      string,
    ]),
  }

  componentDidMount () {
    this.fetchData(this.props.id)
  }

  componentWillReceiveProps (next) {
    if (next.id !== this.props.id) {
      this.fetchData(next.id)
    }
  }

  render () {
    return (
      <div>RUN</div>
    )
  }

  fetchData (id) {
    this.props.fetchRun(id)
    this.props.fetchRunTrack(id)
  }
}
