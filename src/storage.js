const TOKEN_KEY = 'carbonplan-auth-token'

export const storage = {
  get: () => {
    try {
      return window.localStorage.getItem(TOKEN_KEY)
    } catch (err) {
      if (err.message !== 'window is not defined')
        console.warn(
          'localStorage is disabled so cannot be used to persist token',
          err
        )
    }
  },
  set: (value) => {
    try {
      window.localStorage.setItem(TOKEN_KEY, value)
    } catch (err) {
      if (err.message !== 'window is not defined')
        console.warn(
          'localStorage is disabled so cannot be used to persist token',
          err
        )
    }
  },
  remove: () => {
    try {
      window.localStorage.removeItem(TOKEN_KEY)
    } catch (err) {
      if (err.message !== 'window is not defined')
        console.warn(
          'localStorage is disabled so cannot be used to persist token',
          err
        )
    }
  },
}
