import { Schema, model } from 'mongoose'

interface IPost {
  title: string
  content: string
}

export const postSchema = new Schema<IPost>({
  title: String,
  content: String,
})

const Post = model<IPost>('Post', postSchema)

export default Post
