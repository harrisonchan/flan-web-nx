import * as express from 'express'
import authRouter from './auth'
import flanRouter from './flan'

const rootRouter = express.Router()
rootRouter.use('/', authRouter)
rootRouter.use('/', flanRouter)

export default rootRouter
