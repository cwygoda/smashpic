import { Component, Fragment } from 'react'
import { bool, func, instanceOf, number, oneOfType, shape, string } from 'prop-types'
import { distanceUnit } from '../../../prop-types'
import Canvas from '../../atoms/canvas'
import BeachRun from './beach-run.jpg'

// https://github.com/cwygoda/smashpic/blob/rev0/src/components/templates/run-post/RunPost.js

const DEFAULT_IMAGE = BeachRun

export default class RunEdit extends Component {
  static propTypes = {
    distanceUnit: distanceUnit,
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

  state = {
    image: null,
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
    const { distanceUnit, run, track } = this.props
    const imageSrc = this.state.image || DEFAULT_IMAGE
    return (
      <Fragment>
        <Canvas
          ref={c => { this.canvas = c }}
          run={run}
          track={track}
          distanceUnit={distanceUnit}
          imageSrc={imageSrc}
        />
      </Fragment>
    )
  }

  fetchData (id) {
    if (id !== null) {
      this.props.fetchRun(id)
      this.props.fetchRunTrack(id)
    }
  }
}
