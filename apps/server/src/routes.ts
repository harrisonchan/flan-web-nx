import * as express from 'express'
import Flan from './models/Flan'
import Post from './models/Post'
import User from './models/User'

const router = express.Router()

router.get('/posts', async (req, res) => {
  const posts = await Post.find()
  res.send(posts)
})

router.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  })
  await post.save()
  res.send(post)
})

router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    res.send(post)
  } catch {
    res.status(404)
    res.send({ error: `Post with id: ${req.params.id} does not exist` })
  }
})

router.patch('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    if (req.body.title) {
      post.title = req.body.title
    }
    if (req.body.content) {
      post.content = req.body.content
    }

    await post.save()
    res.send(post)
  } catch {
    res.status(404)
    res.send({ error: `Post with id: ${req.params.id} does not exist` })
  }
})

router.delete('/posts/:id', async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: `Post with id: ${req.params.id} does not exist` })
  }
})

router.get('/accounts', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.send({ error })
  }
})

router.get('/account', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
    res.send(user)
  } catch {
    res.send({ error: 'Error' })
  }
})

router.post('/account', async (req, res) => {
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

router.delete('/account', async (req, res) => {
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

router.get('/flan', async (req, res) => {
  try {
    const flans = await Flan.find()
    res.send(flans)
  } catch (error) {
    res.send({ error })
  }
})

router.post('/flan', async (req, res) => {
  try {
    const newFlan = new Flan({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      illustration: req.body.illustration,
      authorId: req.body.authorId,
      tags: req.body.tags,
      participantIds: req.body.participantIds,
    })
    await newFlan.save()
    res.send(newFlan)
  } catch (error) {
    res.send({ error })
  }
})

router.get('/flan/:id', async (req, res) => {
  try {
    const flan = await Flan.findById(req.params.id)
    res.send(flan)
  } catch (error) {
    res.send({ error })
  }
})

router.delete('/flan/:id', async (req, res) => {
  try {
    await Flan.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.send({ error })
  }
})

export default router
