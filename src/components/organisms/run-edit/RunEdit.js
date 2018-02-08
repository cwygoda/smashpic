import { Component, Fragment } from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import FileUpload from 'material-ui-icons/FileUpload'
import Dropzone from 'react-dropzone'
import { bool, func, instanceOf, number, oneOfType, shape, string } from 'prop-types'
import { distanceUnit } from '../../../prop-types'
import Canvas from '../../atoms/canvas'
import BeachRun from './beach-run.jpg'

// https://github.com/cwygoda/smashpic/blob/rev0/src/components/templates/run-post/RunPost.js

const DEFAULT_IMAGE = BeachRun

const styles = theme => ({
  dropzone: {
    position: 'relative',
    maxWidth: '952px',
  },
  uploadButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

class RunEdit extends Component {
  static propTypes = {
    classes: shape({
      dropzone: string.isRequired,
      uploadButton: string.isRequired,
    }).isRequired,
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

  constructor (props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
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
    const { classes, distanceUnit, run, track } = this.props
    const imageSrc = this.state.image || DEFAULT_IMAGE

    return (
      <Fragment>
        <Dropzone
          accept='image/*'
          className={classes.dropzone}
          disablePreview
          multiple={false}
          onDrop={this.onDrop}>
          <Canvas
            ref={c => { this.canvas = c }}
            run={run}
            track={track}
            distanceUnit={distanceUnit}
            imageSrc={imageSrc}
          />
          {imageSrc === DEFAULT_IMAGE &&
            <Button fab color='primary' className={classes.uploadButton}>
              <FileUpload />
            </Button>}
        </Dropzone>
      </Fragment>
    )
  }

  fetchData (id) {
    if (id !== null) {
      this.props.fetchRun(id)
      this.props.fetchRunTrack(id)
    }
  }

  onDrop (accepted) {
    if (accepted.length !== 1) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => this.setState({
      image: reader.result,
    })
    // TODO: Reader error handling
    reader.readAsDataURL(accepted[0])
  }
}

export default withStyles(styles)(RunEdit)
