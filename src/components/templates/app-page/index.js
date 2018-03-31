import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ChevronLeft from 'material-ui-icons/ChevronLeft'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { node, shape, string } from 'prop-types'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    overflow: 'hidden',
    height: '100%',
  },
}

const appPage = ({ backLink, classes, className, children, title }) => {
  const classNames = [classes.container, className].filter(c => c).join(' ')
  const _title = title ? <Typography variant='title'>{title}</Typography> : null
  return (
    <div className={classNames}>
      <AppBar position='static'>
        <Toolbar>
          <Link to={backLink}>
            <IconButton color='secondary'>
              <ChevronLeft />
            </IconButton>
          </Link>
          {_title}
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} className={classes.content}>
        {children}
      </Grid>
    </div>
  )
}

appPage.propTypes = {
  backLink: string.isRequired,
  classes: shape({
    container: string.isRequired,
    content: string.isRequired,
  }).isRequired,
  className: string,
  children: node.isRequired,
  title: string,
}

appPage.defaultProps = {
  backLink: '/',
}

export default withStyles(styles)(appPage)
