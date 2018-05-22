import { withStyles } from 'material-ui/styles'
import { shape, string } from 'prop-types'
import AppPage from '../../templates/app-page'

const styles = theme => {
  return {
    content: {
      padding: theme.spacing.unit,
      maxWidth: '960px',
      margin: '0 auto',
    },
  }
}

const Privacy = ({ classes }) => (
  <AppPage title='Your Privacy'>
    <div className={classes.content}>
      All of your data is ever only shared with your local browser, none is accessible to either the SmashPic servers or anyone else.
    </div>
  </AppPage>
)

Privacy.propTypes = {
  classes: shape({
    content: string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(Privacy)
