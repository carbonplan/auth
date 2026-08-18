import React, { useState, createContext, useContext } from 'react'
import { storage } from './storage'

export type Config = {
  useLocalStorage: boolean
  apiRoute: string
  loginRoute: string
}

export type SessionValue = {
  token: string | null
  username: string | null
  config: Config
}

type SessionContextValue = [
  SessionValue,
  React.Dispatch<React.SetStateAction<SessionValue>>
]

const Session = createContext<SessionContextValue | null>(null)

export const useSession = (): SessionContextValue => {
  const value = useContext(Session)
  if (!value) {
    throw new Error('Tried to useSession() without initializing AuthProvider')
  }

  return value
}

type Props = {
  children: React.ReactNode
  config?: Config
}

export const SessionProvider = ({
  children,
  config = {
    useLocalStorage: false,
    apiRoute: '/api/auth',
    loginRoute: '/login',
  },
}: Props) => {
  const [session, setSession] = useState<SessionValue>({
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
