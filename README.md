<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / auth

**adding simple password authentication to sites**

[![GitHub][github-badge]][github]
[![Build Status]][actions]
![MIT License][]
![NPM Version][]

[github]: https://github.com/carbonplan/auth
[github-badge]: https://badgen.net/badge/-/github?icon=github&label
[build status]: https://github.com/carbonplan/auth/actions/workflows/main.yml/badge.svg
[actions]: https://github.com/carbonplan/auth/actions/workflows/main.yml
[mit license]: https://badgen.net/badge/license/MIT/blue
[npm version]: https://badgen.net/npm/v/@carbonplan/auth

A library for adding simple password authentication to [`next.js`](https://github.com/vercel/next) sites. Rather than use a full-blown user-based authentication system, we adopt a password-only model that is well suited to sharing content previews and similar use cases that do not involve user accounts or other forms of user data.

## usage

To use, install the package with

```
npm i @carbonplan/auth
```

You then need to follow four steps to incorporate auth into your site. For these purposes, we assume you have a fairly standard `next.js` app setup. Feel free to check out the [`example`](/example) in this repo to follow along.

#### `step 01`

Create an api route in your `pages` folder e.g. `api/auth.js`. This file needs to define a secret key for use with the `jsonwebtoken` package, and also define a mapping from one or more user ids to passwords, and then pass these to the `api` function which returns a handler. Typically, you will source these from environmental variables so that they are only accessible on the server. Remember to never commit these keys to GitHub or otherwise make them public!

```js
import { api } from '@carbonplan/auth'

const secret = process.env.JWT_SECRET

const users = [
  {
    username: 'user',
    password: process.env.USER_PASSWORD,
  },
]

const handler = api({ secret, users })

export default handler
```

The handler accepts one additional option, `expiration`, which controls the expiration time for the JSON webtokens. The default is `1hr` but you can provide either a number to specify in seconds (`{expiration: 60}`) or as a string (`{expiration: '5hrs'}`).

#### `step 02`

Wrap your app in an `AuthProvider` by adding the following to your `_app.js` file.

```jsx
import { AuthProvider } from '@carbonplan/auth'

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
```

The `AuthProvider` component also accepts a `config` property. Currently the only configuration is whether to use `localStorage` to store JSON webtokens, which enables authentication to persist so long as the key is valid. You can turn this on using `config={{ useLocalStorage: true }}`.

#### `step 03`

Create a `login.js` page with the following content in your `pages` folder.

```jsx
import { Login } from '@carbonplan/auth'

export default Login
```

#### `step 04`

For any page where you want to require authentication for access, wrap the page component using the `withAuth` higher-order component. For example, we could define a page `pages/protected.js` as follows.

```jsx
import { withAuth } from '@carbonplan/auth'

const Protected = () => {
  return <div>This page is protected</div>
}

export default withAuth(Protected, ['user'])
```

Whenever someone routes to `/protected` they will first be redirected to the login page to enter their password, and then if the password is valid they will be directed back to `/protected` to see its content.

The second argument to `withAuth` specifies a list of valid user ids, which correspond to the ids used when defining the list of valid passwords in `step 01`. For example, if in that step we defined

```
const users = [
  {
    username: 'user',
    password: 'foo'
  },
  {
    username: 'admin',
    password: 'duh'
  },
]
```

Then a page using `withAuth(Protected, ['user'])` would be accessible with the password `foo` (but not `duh`) and a page using `withAuth(Protected, ['admin'])` would be accessible with the password `duh` (but not `foo`). A page using `withAuth(Protected, ['user', 'admin'])` would be accessible with either password. Because we set this at every page, this pattern creates a lot of flexibility in terms of who gets access to which page, but without requiring an explicit model of user accounts or user data.

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of carbon removal and climate solutions through open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/components/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
