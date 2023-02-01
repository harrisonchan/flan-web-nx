import * as express from 'express'
import { expressjwt } from 'express-jwt'
import { deleteUser, loginUser, refreshAuth, registerUser, updateUser } from '../controllers'
import { User } from '../models'

const authRouter = express.Router()

authRouter.get('/refresh-auth', refreshAuth)
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.patch('', updateUser)
authRouter.delete('/delete', deleteUser)

authRouter.get('/auth-test', async (req, res) => {
  //   console.log(req.headers.authorization.split(' ')[1])
  console.log('123123123')
  console.log(req.cookies)
  console.log(req.signedCookies)
  //   const user = await User.findOne({ email: req.body.email })
  //   if (user) {
  //     user.refreshAccessTokens
  //       ? res
  //           .status(200)
  //           .send({ message: `You have ${user.refreshAccessTokens.length} refresh tokens: ${user.refreshAccessTokens.toString()}` })
  //       : res.send({ message: 'No refresh tokens' })
  //   }
  res.cookie('test-me-cookie', '123', { httpOnly: false, maxAge: 300000 })
  res.cookie('test-me-cookie2', '123', { httpOnly: false })

  res.send({ message: 'No use123123123r with that email1' })
})

export default authRouter
