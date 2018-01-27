import { Component } from 'react'
import { arrayOf, bool, func, instanceOf, number, oneOfType, shape, string } from 'prop-types'

// TODO: Test
export default class RunList extends Component {
  static propTypes = {
    fetchRuns: func.isRequired,

    runs: arrayOf(shape({
      id: number.isRequired,
      date: string.isRequired,
      distance: number.isRequired,
      duration: number.isRequired,
    })).isRequired,
    runsStatus: oneOfType([
      bool,
      instanceOf(Error),
    ]).isRequired,
  }

  componentDidMount () {
    this.props.fetchRuns()
  }

  render () {
    const { runs, runsStatus } = this.props
    if (runsStatus === true) {
      return <div>Loading…</div>
    }
    if (runsStatus instanceof Error) {
      return <div>Error: {runsStatus.message}</div>
    }
    return (
      <div>{runs.length}</div>
    )
  }
}
