import * as jwt from 'jsonwebtoken'
import * as dayjs from 'dayjs'
import { LeanDocument } from 'mongoose'
import { IUser } from '../models'

const DEFAULT_ACCESS_TOKEN_AGE = '2h'
const REFRESH_ACCESS_TOKEN_AGE = '7d'

type createAccessTokenParams = {
  payload: IUser | LeanDocument<any>
  maxTokenAge?: number | string | 'defaultAccessToken' | 'refreshAccessToken'
}
export const createAccessToken = ({ payload, maxTokenAge }: createAccessTokenParams) => {
  delete payload.password
  const { username, email } = payload
  const tokenPayload = { id: payload._id, username, email }
  if (maxTokenAge == 'defaultAccessToken') {
    return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: DEFAULT_ACCESS_TOKEN_AGE })
  } else if (maxTokenAge == 'refreshAccessToken') {
    return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '60d' })
  } else {
    return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: maxTokenAge ?? DEFAULT_ACCESS_TOKEN_AGE,
    })
  }
}
