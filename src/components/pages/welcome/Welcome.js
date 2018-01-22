import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'

const Welcome = ({ firstName }) => {
  const displayName = firstName || 'Runner'

  return (
    <Fragment>
      <h1>Hello, {displayName}</h1>
      <Link to='/run'>Let&rsquo;s go</Link>
    </Fragment>
  )
}

Welcome.propTypes = {
  firstName: string,
}

export default Welcome
