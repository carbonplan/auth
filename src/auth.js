import useSWR from 'swr'
import React, { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router.js'
import { Layout } from '@carbonplan/components'
import { useSession } from './session'
import { storage } from './storage'

export function useAuth() {
  const router = useRouter()
  const [{ token, config }] = useSession()

  let auth
  if (config.useLocalStorage) {
    auth = token || storage.get()
  } else {
    auth = token
  }

  const fetcher = (url, token) =>
    fetch(url, { headers: { Authorization: auth } }).then((r) => r.json())

  const { data, error } = useSWR(['/api/auth', auth], fetcher)
  const loading = !data && !error
  const authed = data && data.authed
  const username = data && data.authed ? data.username : null

  return { data, error, loading, authed, username }
}

export const withAuth =
  (Component, usernames = ['admin']) =>
  () => {
    const router = useRouter()
    const [{ config }] = useSession()
    const { data, error, loading } = useAuth()

    useEffect(() => {
      if ((data && !data.authed) || error) {
        if (config.useLocalStorage) storage.remove()
        window.location.assign(
          `/login?redirect=${encodeURIComponent(router.pathname)}`
        )
      }
    }, [data])

    if (data && data.username) {
      if (!usernames.includes(data.username)) {
        data.authed = false
        return (
          <Layout
            title='CarbonPlan – Login'
            description='Login page for authenticated resource'
            status={'restricted'}
          ></Layout>
        )
      }
    }

    if (data && data.authed) {
      return <Component />
    } else {
      return (
        <Layout
          title='CarbonPlan – Login'
          description='Login page for authenticated resource'
          footer={false}
          status={'authenticating'}
        ></Layout>
      )
    }
  }
