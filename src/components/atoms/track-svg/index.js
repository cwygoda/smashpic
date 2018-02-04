import { number, string } from 'prop-types'
import { dataPoints } from '../../../svg'

// TODO: Test
// TODO: Error handling

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

export default TrackSvg
