import { expressjwt } from 'express-jwt'

const USER_API_ROUTE = '/api/user'

export const expressJwtAuth = expressjwt({
  secret: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ['HS256'],
}).unless({
  path: [`${USER_API_ROUTE}/login`, `${USER_API_ROUTE}/register`],
})
