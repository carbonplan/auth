import { ThemeProvider } from 'theme-ui'
import theme from '@carbonplan/theme'
import { AuthProvider } from '@carbonplan/auth'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider config={{ useLocalStorage: true }}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
