import * as express from 'express'
import User from '../models/User'

const authRouter = express.Router()

authRouter.get('/accounts', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.send({ error })
  }
})

authRouter.post('/account', async (req, res) => {
  // console.log(req.params)
  console.log('trying to log in')
  console.log(req.body)
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
    // console.log(req)
    // console.log(req.params)
    // console.log(req.body)
    // console.log(req.body.email, req.body.password)
    if (user) {
      res.send({ user, message: 'Login Success' })
      console.log('Login Success')
    } else {
      res.send({ message: 'Check your email or password' })
    }
  } catch {
    res.send({ error: 'Error' })
  }
})

authRouter.post('/account/register', async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      birthday: req.body.birthday,
      email: req.body.email,
      password: req.body.password,
    })
    await newUser.save()
    res.send(newUser)
  } catch {}
})

// authRouter.patch('/account', async (req, res) => {
//   try {
//     // const { firstName, lastName, username, birthday, email, password } = req.body
//     const updatedUser = new User({
//       firstName: req.body.firstName ? req.body.firstName : null,
//       lastName: req.body.lastName,
//       username: req.body.username,
//       birthday: req.body.birthday,
//       email: req.body.email,
//       password: req.body.password,
//     })
//   } catch (error) {
//     res.send({ error})
//   }
// })

authRouter.delete('/account', async (req, res) => {
  try {
    await User.deleteOne({
      email: req.body.email,
      password: req.body.password,
    })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: 'error' })
  }
})

export default authRouter
