import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { shape, string } from 'prop-types'
import AppPage from '../../templates/app-page'
import Version from '../../atoms/version'

const styles = theme => {
  console.log(theme)
  return {
    content: {
      padding: theme.spacing.unit,
      maxWidth: '960px',
      width: '100%',
      margin: '0 auto',
    },
  }
}

const About = ({ classes }) => (
  <AppPage title='About Smashpic'>
    <div className={classes.content}>
      <p>Smashpic uses your Smashruns and your pictures to create lasting little reminders of that run you enjoyed so much.</p>
      <p>None of your data is transferred outside smashrun.com and your browser. Still, Smashpic uses Google Analytics to get insights into how it is used, but with enough obfuscation that you can feel safe. Read more about your <Link to='/privacy'>privacy</Link>.</p>
      <h1>Open Source</h1>
      <p>Smashpic is open source software, you can explore the actual code at <a href='https://github.com/cwygoda/smashpic'>Github</a>.</p>
      <h1>Version</h1>
      <Version />
    </div>
  </AppPage>
)

About.propTypes = {
  classes: shape({
    content: string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(About)
