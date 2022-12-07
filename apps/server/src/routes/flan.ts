import * as express from 'express'
import Flan from '../models/Flan'

const flanRouter = express.Router()

// flanRouter.get('/flan', async (req, res) => {
//   try {
//     const flans = await Flan.find()
//     res.send(flans)
//   } catch (error) {
//     res.send({ error })
//   }
// })

flanRouter.post('/flan', async (req, res) => {
  try {
    const newFlan = new Flan({
      title: req.body.title,
      description: req.body.description,
      illustration: req.body.illustration,
      author: req.body.author,
      location: req.body.location,
      activities: req.body.activities,
      polls: req.body.polls,
    })
    await newFlan.save()
    res.send(newFlan)
  } catch (error) {
    res.send({ error })
  }
})

flanRouter.post('/flan/:id', async (req, res) => {
  try {
    console.log('trying to find flan by id...', `${req.params.id}`)
    // console.log(req)
    const id = req.params.id
    console.log(id)
    const flan = await Flan.findById(id)
    res.send(flan)
  } catch (error) {
    res.send({ error })
  }
})

flanRouter.delete('/flan/:id', async (req, res) => {
  try {
    await Flan.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.send({ error })
  }
})

// flanRouter.delete('/reset', async (req, res) => {
//   try {
//     await User.deleteMany()
//     await Post.deleteMany()
//     await Flan.deleteMany()
//     res.send({ message: 'deleted all...' })
//   } catch (error) {
//     res.send({ error })
//   }
// })

export default flanRouter
