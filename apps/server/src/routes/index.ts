import * as express from 'express'
import { Express } from 'express'
import authRouter from './authRouter'

const routes = (app: Express) => {
  const rootRouter = express.Router()
  rootRouter.use('/user', authRouter)
  rootRouter.get('/test', async (req, res) => {
    res.send({ message: 'Hello 1World!' })
  })
  app.use('/api', rootRouter)
}

export default routes
