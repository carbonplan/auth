import React, { useState, useEffect, FormEvent } from 'react'
import { Box, Heading, Input, Button } from 'theme-ui'
import { useRouter } from 'next/router.js'
import { Layout, Row, Column } from '@carbonplan/components'
import { useSession } from './session'
import { storage } from './storage'

type Props = {
  disclaimer?: React.ReactNode
}
type Status = 'submitting' | 'invalid' | 'authenticating'

const Login = ({ disclaimer }: Props) => {
  const router = useRouter()
  const [{ config }, setSession] = useSession()
  const [status, setStatus] = useState<Status | null>(null)
  const [password, setPassword] = useState('')

  const redirect = Array.isArray(router.query.redirect)
    ? router.query.redirect[0]
    : router.query.redirect

  const disabled = !!status && ['authenticating', 'submitting'].includes(status)

  useEffect(() => {
    if (config.useLocalStorage) {
      const auth = storage.get()
      if (auth && redirect) {
        router.push(redirect)
      }
    }
  }, [redirect, config.useLocalStorage])

  async function submit(e: MouseEvent | FormEvent) {
    setStatus('submitting')
    e.preventDefault()
    const res = await fetch(config.apiRoute, {
      method: 'POST',
      body: JSON.stringify({ password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status !== 200) {
      setStatus('invalid')
      setTimeout(() => {
        setStatus(null)
      }, 1000)
    } else {
      const { username, token } = await res.json()
      setSession({ token: token, username: username, config: config })
      if (config.useLocalStorage) storage.set(token)
      setStatus('authenticating')
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/')
      }
    }
  }

  return (
    <Layout
      status={status}
      footer={false}
      title='CarbonPlan – Login'
      description='Login page for authenticated resource'
    >
      <Row sx={{ mt: [5] }}>
        <Column start={[1, 2]} width={[6, 6]}>
          <Heading sx={{ my: [4, 5, 5], fontSize: [6, 7, 7] }}>
            This page is private
          </Heading>
          <Box sx={{ mt: [3, 4, 4], fontSize: [4, 5, 5] }}>
            Enter a password to continue
          </Box>
          {disclaimer && <Box sx={{ mt: [2] }}>{disclaimer}</Box>}
          <Box
            as='form'
            onSubmit={(e) => {
              submit(e)
            }}
            sx={{ fontSize: [4], mt: [3, 4, 4], mb: [4] }}
          >
            <Input
              sx={{
                width: ['200px'],
                mt: [2],
                borderStyle: 'solid',
                borderWidth: '0px',
                borderBottomWidth: '1px',
                borderColor: 'secondary',
                borderRadius: '0px',
                transition: '0.15s',
                ':focus-visible': {
                  outline: 'none !important',
                  background: 'none !important',
                  borderColor: 'primary',
                },
              }}
              type='password'
              name='password'
              id='password'
              value={password}
              placeholder='Password?'
              autoFocus={true}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Button
              disabled={disabled}
              onClick={(e) => {
                submit(e)
              }}
              type='submit'
              sx={{
                fontFamily: 'faux',
                color: 'text',
                display: 'inline-block',
                mr: [3],
                fontSize: [7],
                mt: [2],
                cursor: 'pointer',
                '&:hover': {
                  color: disabled ? 'primary' : 'secondary',
                },
                background: 'none',
                p: [0],
              }}
            >
              →
            </Button>
          </Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default Login
