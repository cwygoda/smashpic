import Grid from 'material-ui/Grid'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { arrayOf, bool, func, instanceOf, number, object, oneOfType, shape, string } from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { distanceUnit } from '../../../prop-types'
import RunCard from '../run-card'

const styles = theme => ({
  runList: {
    textAlign: 'center',
    '& a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
  },
})

// TODO: Test
class RunList extends Component {
  static propTypes = {
    classes: shape({
      runList: string.isRequired,
    }).isRequired,
    distanceUnit: distanceUnit,

    fetchRuns: func.isRequired,
    fetchRunTrack: func.isRequired,

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

    tracks: object.isRequired,
  }

  componentDidMount () {
    this.props.fetchRuns(10)
    this.props.runs.map(run => this.props.fetchRunTrack(run.id))
  }

  componentWillReceiveProps (next) {
    next.runs.map(run => {
      if (typeof next.tracks[run.id] === 'undefined') {
        this.props.fetchRunTrack(run.id)
      }
    })
  }

  render () {
    const { classes, distanceUnit, runs, runsStatus, tracks } = this.props
    if (runsStatus === true) {
      return <div>Loading…</div>
    }
    if (runsStatus instanceof Error) {
      return <div>Error: {runsStatus.message}</div>
    }

    return (
      <Grid container spacing={8} className={classes.runList}>
        {runs.map(run =>
          <Grid key={run.id} item xs={12} sm={6} md={12}>
            <Link to={`/run/${run.id}`}>
              <RunCard
                id={run.id}
                date={run.date}
                distance={run.distance}
                duration={run.duration}
                distanceUnit={distanceUnit}
                track={tracks[run.id]}
              />
            </Link>
          </Grid>)}
      </Grid>
    )
  }
}

export default withStyles(styles)(RunList)
