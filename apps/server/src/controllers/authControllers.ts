import * as jwt from 'jsonwebtoken'
import { IUser, User } from '../models'
import { authControllersHandleErrors, createAccessToken, createAccessAndRefreshAccessTokens } from '../utils'
import * as bcrypt from 'bcrypt'

const refreshAuth = async (req, res) => {
  // try {
  //   const { refreshAccessToken } = req.body
  //   jwt.verify(refreshAccessToken, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] }, (error, decoded) => {
  //     // console.log(decoded)
  //     if (error) {
  //       res.status(401).send({ message: 'Invalid refresh token' })
  //     }
  //     // const user = await User.checkRefreshAccessToken(decoded._id, refreshAccessToken)
  //     // const newRefreshToken = createAccessToken()
  //   })
  // } catch (error) {}

  try {
    console.log(req.cookies)
    console.log(req.headers)
  } catch (error) {}
}

const registerUser = async (req, res) => {
  try {
    const newUser = await User.register(req.body)
    const { user } = newUser

    const { accessToken, refreshAccessToken } = createAccessAndRefreshAccessTokens({ payload: user })
    await User.pushRefreshAccessToken(newUser.userDocument, refreshAccessToken)
    res.cookie('access_token', accessToken, { httpOnly: true })
    res.cookie('refresh-access-token', refreshAccessToken, { httpOnly: true })

    res.status(201).send({ user, message: 'Register Success' })
  } catch (error) {
    const errorMessage = authControllersHandleErrors(error)
    res.status(400).send({ message: errorMessage })
    console.log(error)
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const { user, userDocument } = await User.login(email, password)
    if (user) {
      // Create new tokens
      const { accessToken, refreshAccessToken } = createAccessAndRefreshAccessTokens({ payload: user })
      const { user: updatedUser } = await User.pushRefreshAccessToken(userDocument, refreshAccessToken)
      if (updatedUser) {
        res.cookie('access-token', accessToken, { httpOnly: true })
        res.cookie('refresh-access-token', refreshAccessToken, { httpOnly: true })
        res.status(200).send({ user: updatedUser, message: 'Login Success', accessTokens: { accessToken, refreshAccessToken } })
        console.log(`Login Success: ${updatedUser}`)
      } else {
        res.status(400).send({ message: 'Error getting 123access token when logging in' })
      }
    } else {
      res.status(400).send({ message: 'Check your email or passwo213rd1' })
    }
  } catch (error) {
    const errorMessage = authControllersHandleErrors(error)
    res.status(400).send({ message: errorMessage })
    console.log(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const { user } = await User.updateUser(req.body.email, req.body)
    res.status(200).send({ user, message: 'Update Success' })
  } catch (error) {
    const errorMessage = authControllersHandleErrors(error)
    res.status(400).send({ message: errorMessage })
    console.log(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body
    await User.deleteUser(email, password)
    res.status(200).send({ message: `Successfully deleted user with email: ${email}` })
  } catch (error) {
    const errorMessage = authControllersHandleErrors(error)
    res.status(400).send({ message: errorMessage })
    console.log(error)
  }
}

export { refreshAuth, registerUser, loginUser, updateUser, deleteUser }
