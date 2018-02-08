import { Component, Fragment } from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import FileDownload from 'material-ui-icons/FileDownload'
import FileUpload from 'material-ui-icons/FileUpload'
import Dropzone from 'react-dropzone'
import moment from 'moment'
import { bool, func, instanceOf, number, oneOfType, shape, string } from 'prop-types'
import { distanceUnit } from '../../../prop-types'
import Canvas from '../../atoms/canvas'
import BeachRun from './beach-run.jpg'

const DEFAULT_IMAGE = BeachRun

const styles = theme => ({
  dropzone: {
    position: 'relative',
    maxWidth: '952px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
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
      leftIcon: string.isRequired,
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
    this.download = this.download.bind(this)
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
        <Button raised onClick={this.download}>
          <FileDownload className={classes.leftIcon} />
          Download
        </Button>
        <a ref={a => { this.downloadLink = a }} />
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

  download () {
    const datetime = moment(this.props.run.startDateTimeLocal).format('YY-MM-DD-HH-mm')
    const filename = `smashpic-${datetime}.jpg`
    this.downloadLink.href = this.canvas.getCanvas().toDataURL('image/jpeg', 0.85)
    this.downloadLink.download = filename
    this.downloadLink.click()
    const DOMURL = window.URL || window.webkitURL || window
    DOMURL.revokeObjectURL(this.downloadLink.href)
  }
}

export default withStyles(styles)(RunEdit)
