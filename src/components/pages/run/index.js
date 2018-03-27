import Grid from 'material-ui/Grid'
import withWidth from 'material-ui/utils/withWidth'
import { withStyles } from 'material-ui/styles'
import { shape, string } from 'prop-types'
import AppPage from '../../templates/app-page'
import RunList from '../../organisms/run-list'
import RunEdit from '../../organisms/run-edit'

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: '100%', // required for Firefox somehow
  },
  list: {
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '100%',
  },
}

const renderList = (isSmall, id, className) => {
  if (isSmall && id) {
    return
  }
  return (
    <Grid item xs={12} md={3} className={className} key='list'>
      <RunList />
    </Grid>
  )
}

const renderRun = (isSmall, id) => {
  if (isSmall && !id) {
    return
  }
  return (
    <Grid item xs={12} md={9} key='run'>
      <RunEdit id={id} />
    </Grid>
  )
}

const Run = ({ width, match: { params: { id: _id } }, classes }) => {
  const isSmall = width === 'xs' || width === 'sm'
  const id = _id ? parseInt(_id, 10) : null
  const backLink = isSmall ? (id ? '/run' : '/') : '/'
  const { run: runClass, list: listClass } = classes

  return (
    <AppPage backLink={backLink} className={runClass}>
      <div className={classes.container}>
        {renderList(isSmall, id, listClass)}
        {renderRun(isSmall, id)}
      </div>
    </AppPage>
  )
}

Run.propTypes = {
  classes: shape({
    container: string.isRequired,
    list: string.isRequired,
  }).isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }),
  width: string.isRequired,
}

export default withWidth()(withStyles(styles)(Run))
