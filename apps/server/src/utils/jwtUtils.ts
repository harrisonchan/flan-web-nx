import * as jwt from 'jsonwebtoken'
import { LeanDocument } from 'mongoose'
import { IUser } from '../models'

const DEFAULT_ACCESS_TOKEN_AGE = 900 //15 minutes = 900 seconds
const REFRESH_ACCESS_TOKEN_AGE = '60d'

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
    return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: REFRESH_ACCESS_TOKEN_AGE })
  } else {
    return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: maxTokenAge ?? DEFAULT_ACCESS_TOKEN_AGE,
    })
  }
}

export const createAccessAndRefreshAccessTokens = ({ payload }: createAccessTokenParams) => {
  const accessToken = createAccessToken({ payload, maxTokenAge: 'defaultAccessToken' })
  const refreshAccessToken = createAccessToken({ payload, maxTokenAge: 'refreshAccessToken' })
  return { accessToken, refreshAccessToken }
}

export const verifyAccessToken = (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] })
    return decoded
  } catch (error) {
    return null
  }
}
