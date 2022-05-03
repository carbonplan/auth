import { api } from '@carbonplan/auth'

const secret = process.env.JWT_SECRET

const users = [
  {
    username: 'user',
    password: process.env.PASSWORD,
  },
]

export default api(secret, users)
