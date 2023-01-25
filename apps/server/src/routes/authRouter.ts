import * as express from 'express'
import { deleteUser, loginUser, refreshAccessToken, registerUser, updateUser } from '../controllers'

const authRouter = express.Router()

// authRouter.post('/user/refresh-access-token', refreshAccessToken)
authRouter.post('/user/register', registerUser)
authRouter.post('/user/login', loginUser)
authRouter.patch('/user', updateUser)
authRouter.delete('/user/delete', deleteUser)

export default authRouter
