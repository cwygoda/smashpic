import { createMuiTheme } from 'material-ui/styles'

// https://material.io/color/#!/?view.left=0&view.right=1&secondary.color=DD2C00&primary.color=263238

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#ff9551',
      main: '#ff6322',
      dark: '#c42f00',
      contrastText: '#000',
    },
    secondary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#fff',
    },
  },
})
