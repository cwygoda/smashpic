import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ChevronLeft from 'material-ui-icons/ChevronLeft'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { node, shape, string } from 'prop-types'

const styles = {
  content: {
    flex: 1,
  },
}

const appPage = ({ backLink, classes, className, content }) => {
  return (
    <div className={className}>
      <AppBar position='static'>
        <Toolbar>
          <Link to={backLink}>
            <IconButton color='secondary'>
              <ChevronLeft />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} className={classes.content}>
        {content}
      </Grid>
    </div>
  )
}

appPage.propTypes = {
  backLink: string.isRequired,
  classes: shape({
    content: string.isRequired,
  }).isRequired,
  className: string,
  content: node.isRequired,
}

appPage.defaultProps = {
  backLink: '/',
}

export default withStyles(styles)(appPage)
