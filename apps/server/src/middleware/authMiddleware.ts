import { expressjwt } from 'express-jwt'

const USER_API_ROUTE = '/api/user'

export const expressJwtAuth = expressjwt({
  secret: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ['HS256'],
  // getToken: (req) => {

  // }
  getToken: (req) => {
    console.log(req.headers)
  },
}).unless({
  path: ['/api/user/auth-test', `${USER_API_ROUTE}/refresh-auth`, `${USER_API_ROUTE}/login`, `${USER_API_ROUTE}/register`],
})
