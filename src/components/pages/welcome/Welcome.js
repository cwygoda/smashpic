import { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { shape, string } from 'prop-types'
import Button from 'material-ui/Button'
import runner from './runner.jpg'

const styles = theme => ({
  welcome: {
    padding: '1em',
    maxWidth: '960px',
    margin: '0 auto',
  },
  hero: {
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  headline: {
    stroke: '#000',
    strokeWidth: '0.1px',
    strokeOpacity: 0.3,
    fill: 'url(#pattern)',
  },
  letsGo: {
    textAlign: 'center',
    marginTop: '2em',
    '& a': {
      textDecoration: 'none',
    },
  },
})

class Welcome extends Component {
  state = {
    textWidth: null,
  }

  componentWillReceiveProps (next) {
    const { firstName } = this.props
    if (next.firstName !== firstName) {
      this.setState({
        textWidth: null,
      })
    }
  }

  render () {
    const { classes, firstName } = this.props
    const { textWidth } = this.state

    window.setTimeout(() => {
      if (this.text && this.state.textWidth === null) {
        this.setState({
          textWidth: Math.ceil(this.text.getBBox().width),
        })
      }
    })

    return (
      <div className={classes.welcome}>
        <svg
          preserveAspectRatio='xMaxYMin slice'
          viewBox={`0 0 ${textWidth || 200} 36`}
          className={classes.hero}>
          <pattern
            id='pattern'
            patternUnits='userSpaceOnUse'
            width={`${textWidth || 200}`}
            height='36'>
            <image
              width='100%'
              height='100%'
              preserveAspectRatio='xMinYMin slice'
              xlinkHref={runner} />
          </pattern>
          <text
            ref={t => { this.text = t }}
            x='0'
            y='0'
            textAnchor='start'
            className={classes.headline}>
            <tspan x='0' y='1em' dy='0'>Hello</tspan>
            <tspan x='0' dy='1.2em'>{firstName},</tspan>
            <tspan x='0' dy='1.2em'>Let&rsquo;s go</tspan>
          </text>
        </svg>
        <p>
          Here at SmashPic you can create lasting memories for you SmashRuns.
          Take a picture, select a run and you&rsquo;re ready to roll!
        </p>
        <div className={classes.letsGo}>
          <Link to='/run'>
            <Button size='large' variant='raised' color='primary'>Let&rsquo;s go</Button>
          </Link>
        </div>
      </div>
    )
  }
}

Welcome.propTypes = {
  classes: shape({
    headline: string.isRequired,
    hero: string.isRequired,
    letsGo: string.isRequired,
    welcome: string.isRequired,
  }).isRequired,
  firstName: string,
}

Welcome.defaultProps = {
  firstName: 'Runner',
}

export default withStyles(styles)(Welcome)
