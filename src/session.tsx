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

const DEFAULT_CONFIG: Config = {
  useLocalStorage: false,
  apiRoute: '/api/auth',
  loginRoute: '/login',
}

type Props = {
  children: React.ReactNode
  config?: Partial<Config>
}

export const SessionProvider = ({ children, config: configProp }: Props) => {
  const config: Config = { ...DEFAULT_CONFIG, ...configProp }

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
