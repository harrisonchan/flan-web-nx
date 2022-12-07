/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express'
import * as mongoose from 'mongoose'
import rootRouter from './routes'
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', rootRouter)

app.get('/test', (req, res) => {
  res.send({ message: 'Test works!' })
})

const port = process.env.port || 3333

mongoose.connect('mongodb://localhost:27017/flanTest', {}).then(() => {
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })
  server.on('error', console.error)
})
