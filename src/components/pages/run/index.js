import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ChevronLeft from 'material-ui-icons/ChevronLeft'
import { Link } from 'react-router-dom'
import withWidth from 'material-ui/utils/withWidth'
import { withStyles } from 'material-ui/styles'
import { shape, string } from 'prop-types'
import RunList from '../../organisms/run-list'
import RunEdit from '../../organisms/run-edit'

const styles = {
  run: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
  list: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}

const renderList = (isSmall, id, className) => {
  if (isSmall && id) {
    return
  }
  return (
    <Grid item xs={12} md={3} className={className}>
      <RunList />
    </Grid>
  )
}

const renderRun = (isSmall, id) => {
  if (isSmall && !id) {
    return
  }
  return (
    <Grid item xs={12} md={9}>
      <RunEdit id={id} />
    </Grid>
  )
}

const Run = ({ width, match: { params: { id: _id } }, classes }) => {
  const isSmall = width === 'xs' || width === 'sm'
  const id = _id ? parseInt(_id, 10) : null
  const backLink = isSmall ? (id ? '/run' : '/') : '/'
  const { run: runClass, content: contentClass, list: listClass } = classes
  return (
    <div className={runClass}>
      <AppBar position='static' className='runHeader'>
        <Toolbar>
          <Link to={backLink}>
            <IconButton color='secondary'>
              <ChevronLeft />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} className={contentClass}>
        {renderList(isSmall, id, listClass)}
        {renderRun(isSmall, id)}
      </Grid>
    </div>
  )
}

Run.propTypes = {
  classes: shape({
    content: string.isRequired,
    list: string.isRequired,
    run: string.isRequired,
  }).isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }),
  width: string.isRequired,
}

export default withWidth()(withStyles(styles)(Run))
