import * as express from 'express'
import authRouter from './authRouter'

const rootRouter = express.Router()
rootRouter.use('/', authRouter)

export default rootRouter
