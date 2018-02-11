import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'
import Button from 'material-ui/Button'

const Welcome = ({ firstName }) => {
  const displayName = firstName || 'Runner'

  return (
    <Fragment>
      <h1>Hello, {displayName}</h1>
      <Button variant='raised'>
        <Link to='/run'>Let&rsquo;s go</Link>
      </Button>
    </Fragment>
  )
}

Welcome.propTypes = {
  firstName: string,
}

export default Welcome
