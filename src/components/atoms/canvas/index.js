import Pica from 'pica'
import { Component } from 'react'
import { bool, number, object, oneOfType, string } from 'prop-types'
import webfontloader from 'webfontloader'
import { formatDistance, formatDuration } from '../../../formatters'
import { distanceUnit } from '../../../prop-types'
import { svgString } from '../../../svg'
import * as fvd from './fvd'

const CANVAS_SIZE = 476

export default class Canvas extends Component {
  static propTypes = {
    city: string,
    country: string,
    distanceUnit: distanceUnit,
    imageSrc: string.isRequired,
    run: object,
    track: oneOfType([
      bool,
      string,
    ]),

    fontLocation: string.isRequired,
    fontSizeLocation: number.isRequired,

    fontStats: string.isRequired,
    fontSizeStats: number.isRequired,
  }

  static defaultProps = {
    fontLocation: 'Roboto:n4nc',
    fontSizeLocation: 20,

    fontStats: 'Roboto:i9nc',
    fontSizeStats: 32,
  }

  state = {
    fontState: null,
  }

  componentDidMount () {
    this.loadFonts()
  }

  componentDidUpdate (prevProps, prevState) {
    this.renderImage()
  }

  render () {
    const style = {
      width: '100%',
    }

    const size = CANVAS_SIZE

    return (
      <canvas
        height={size}
        width={size}
        style={style}
        ref={c => { this.canvas = c }} />
    )
  }

  loadFonts () {
    const setState = (status) => this.setState({ status })

    webfontloader.load({
      custom: {
        families: [this.props.fontLocation, this.props.fontStats],
      },
      loading: () => setState('loading'),
      active: () => setState('active'),
      inactive: () => setState('inactive'),
    })
  }

  renderImage () {
    const { canvas } = this
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.onload = () => {
      const ratio = img.height / img.width
      const height = Math.floor(this.canvas.width * ratio)
      this.canvas.height = height

      const resizer = new Pica({
        tile: 256,
        features: ['js', 'wasm', 'ww'],
        idle: 2000,
      })
      resizer.resize(img, this.canvas, {
        unsharpAmount: 80,
        unsharpRadius: 0.6,
        unsharpThreshold: 2,
      }).then(() => {
        this.renderLocation()
        this.renderStats()
        this.renderTrack()
      })
    }

    const { imageSrc } = this.props
    img.src = imageSrc
  }

  renderLocation () {
    const { city, country } = this.props
    if (!city || !country) {
      return
    }

    const text = [city, country].join(', ')
    const ctx = this.canvas.getContext('2d')
    const { fontSizeLocation, fontLocation } = this.props
    ctx.font = fvd.expression(fvd.parse(fontLocation), fontSizeLocation)
    ctx.fillStyle = 'white'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
    ctx.shadowOffsetX = fontSizeLocation * 0.1
    ctx.shadowOffsetY = fontSizeLocation * 0.1
    ctx.shadowBlur = fontSizeLocation * 0.1
    const x = fontSizeLocation
    const y = this.canvas.height - fontSizeLocation
    ctx.fillText(text, x, y)
  }

  renderStats () {
    const { city, country, distanceUnit, run } = this.props
    const { distance, duration } = run || {}

    if (!distance || !duration) {
      return
    }

    const distanceString = formatDistance(distance, distanceUnit)
    const durationString = formatDuration(duration)
    const text = `${distanceString} in ${durationString}`

    const ctx = this.canvas.getContext('2d')
    const { fontSizeStats, fontStats, fontSizeLocation } = this.props
    ctx.font = fvd.expression(fvd.parse(fontStats), fontSizeStats)
    ctx.fillStyle = 'white'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
    ctx.shadowOffsetX = fontSizeStats * 0.1
    ctx.shadowOffsetY = fontSizeStats * 0.1
    ctx.shadowBlur = fontSizeStats * 0.1
    const x = fontSizeLocation
    const offset = (!city || !country) ? 1.5 : 2.5
    const y = this.canvas.height - offset * fontSizeLocation
    ctx.fillText(text, x, y)
  }

  renderTrack () {
    const { track, fontSizeLocation } = this.props

    if (typeof track !== 'string') {
      return
    }

    const size = Math.floor(Math.min(this.canvas.width, this.canvas.height) / 4)

    const DOMURL = window.URL || window.webkitURL || window
    const img = new Image()
    const svg = new Blob([svgString(track, 2, 'white', 3)], { type: 'image/svg+xml' })
    const url = DOMURL.createObjectURL(svg)

    img.onload = () => {
      const ctx = this.canvas.getContext('2d')
      const sizeFactor = Math.max(img.width, img.height)
      const width = img.width / sizeFactor * size
      const height = img.height / sizeFactor * size
      const x = this.canvas.width - width - fontSizeLocation
      const y = this.canvas.height - height - fontSizeLocation
      ctx.drawImage(img, x, y, width, height)
      DOMURL.revokeObjectURL(url)
    }
    img.src = url
    window.img = img
  }

  getCanvas () {
    return this.canvas
  }
}
