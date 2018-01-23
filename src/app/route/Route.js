import { Redirect, Route as BaseRoute } from 'react-router-dom'
import { bool, func, object, oneOfType, string } from 'prop-types'

const Route = ({ component: Component, token, location, private: _private, ...rest }) => (
  <BaseRoute {...rest} render={props => {
    return (
      !_private || token ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/auth/smashrun',
          state: { from: location },
        }} />
      )
    )
  }} />
)

Route.propTypes = {
  component: func.isRequired,
  location: oneOfType([
    object,
    string,
  ]),
  private: bool.isRequired,
  token: string,
}

Route.defaultProps = {
  private: false,
}

export default Route
