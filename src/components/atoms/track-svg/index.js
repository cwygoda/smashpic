import { decode } from 'google-polyline'
import { mercator } from 'projections'
import { number, string } from 'prop-types'

// TODO: Test
// TODO: Error handling

const dataPoints = (data, strokeWidth = 0) => {
  const points = decode(data)
    .map(p => ({ lon: p[1], lat: p[0] }))
    .map(mercator)

  const x = points.map(p => p.x)
  const y = points.map(p => p.y)
  const bbox = {
    xmin: Math.min(...x),
    ymin: Math.min(...y),
    xmax: Math.max(...x),
    ymax: Math.max(...y),
  }
  const width = bbox.xmax - bbox.xmin
  const height = bbox.ymax - bbox.ymin
  const size = Math.max(height, width)

  const fx = x => (100 - strokeWidth) * width / size * (x - bbox.xmin) / width + strokeWidth / 2
  const fy = y => (100 - strokeWidth) * height / size * (y - bbox.ymin) / height + strokeWidth / 2

  return {
    points: points.map(p => ({
      x: fx(p.x),
      y: fy(p.y),
    })),
    viewBox: [
      fx(bbox.xmin),
      fy(bbox.ymin),
      fx(bbox.xmax),
      fy(bbox.ymax),
    ],
  }
}

const svgString = (data, strokeWidth = 2, strokeColor = 'black', overSample = 1) => {
  const { points, viewBox } = dataPoints(data, strokeWidth)
  const width = (viewBox[2] - viewBox[0] + strokeWidth) * overSample
  const height = (viewBox[3] - viewBox[1] + strokeWidth) * overSample
  const vb = `${viewBox[0] - 2} ${viewBox[1] - 2} ${viewBox[2] + 2} ${viewBox[3] + 2}`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${vb}">
                 <g
                   fill="none"
                   stroke="${strokeColor}"
                   stroke-width="${strokeWidth}"
                   stroke-linejoin="round"
                   stroke-linecap="round">
                   <polyline points="${points.map(p => `${p.x},${p.y}`).join(' ')}" />
                </g>
               </svg>`
  return svg
}

const TrackSvg = ({ color, track, width }) => {
  const { points, viewBox } = dataPoints(track, width)
  const viewBoxWidth = viewBox[2] - viewBox[0] + width
  const viewBoxHeight = viewBox[3] - viewBox[1] + width
  const vb = `${viewBox[0] - 2} ${viewBox[1] - 2} ${viewBox[2] + 2} ${viewBox[3] + 2}`

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={vb}>
      <g
        fill='none'
        stroke={color}
        strokeWidth={width}
        strokeLinejoin='round'
        strokeLinecap='round'>
        <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} />
      </g>
    </svg>
  )
}

TrackSvg.propTypes = {
  color: string.isRequired,
  track: string.isRequired,
  width: number.isRequired,
}

TrackSvg.defaultProps = {
  color: 'black',
  width: 2,
}

export { svgString }
export default TrackSvg
