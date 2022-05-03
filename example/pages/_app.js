import { useState } from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from '@carbonplan/theme'
import { AuthProvider } from '@carbonplan/auth'

const App = ({ Component, pageProps }) => {
  const [session, setSession] = useState({ token: null, username: null })
  return (
    <AuthProvider session={session} setSession={setSession}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
