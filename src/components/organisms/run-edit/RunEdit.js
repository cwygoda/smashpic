import { Component } from 'react'
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
  canvas: {
    border: `${theme.spacing.unit}px solid ${theme.palette.secondary.main}`,
    margin: theme.spacing.unit,
    '& canvas': {
      display: 'block',
    },
  },
  dropzone: {
    position: 'relative',
    maxWidth: '476px',
    margin: 'auto',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  runEdit: {
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing.unit,
  },
  uploadButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    '&.faded': {
      opacity: 0.25,
    },
  },
})

class RunEdit extends Component {
  static propTypes = {
    city: string,
    classes: shape({
      canvas: string.isRequired,
      dropzone: string.isRequired,
      leftIcon: string.isRequired,
      runEdit: string.isRequired,
      uploadButton: string.isRequired,
    }).isRequired,
    country: string,
    distanceUnit: distanceUnit,
    fetchRun: func.isRequired,
    fetchRunTrack: func.isRequired,
    geocode: func.isRequired,
    id: number,
    run: shape({
      id: number.isRequired,
      date: string.isRequired,
      distance: number.isRequired,
      duration: number.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
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
    if (next.run) {
      this.props.geocode(next.run.lat, next.run.lng)
    }
  }

  render () {
    const { city, classes, country, distanceUnit, run, track } = this.props
    const imageSrc = this.state.image || DEFAULT_IMAGE
    const uploadButtonClasses = [classes.uploadButton, imageSrc === DEFAULT_IMAGE ? false : 'faded'].filter(c => c).join(' ')

    return (
      <div className={classes.runEdit}>
        <Dropzone
          accept='image/*'
          className={classes.dropzone}
          disablePreview
          multiple={false}
          onDrop={this.onDrop}>
          <div className={classes.canvas}>
            <Canvas
              ref={c => { this.canvas = c }}
              run={run}
              track={track}
              distanceUnit={distanceUnit}
              imageSrc={imageSrc}
              city={city}
              country={country}
            />
          </div>
          <Button variant='fab' color='secondary' className={uploadButtonClasses}>
            <FileUpload />
          </Button>
        </Dropzone>
        <Button variant='raised' color='primary' onClick={this.download}>
          <FileDownload className={classes.leftIcon} />
          Download
        </Button>
        <a ref={a => { this.downloadLink = a }} />
      </div>
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
