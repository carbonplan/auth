import React, { useState, createContext, useContext } from 'react'
import { storage } from './storage'

const Session = createContext(null)

export const useSession = () => {
  return useContext(Session)
}

export const SessionProvider = ({
  children,
  config = { useLocalStorage: false },
}) => {
  const [session, setSession] = useState({
    token: null,
    username: null,
    config: config,
  })

  if (config.useLocalStorage === false) {
    storage.remove()
  }

  return (
    <Session.Provider value={[session, setSession]}>
      {children}
    </Session.Provider>
  )
}
