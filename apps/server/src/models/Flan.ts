import { model, Schema } from 'mongoose'

interface IFlan {
  title: string
  description: string
  content: string
  illustration: string
  authorId: string
  tags: string[]
  participantIds: string[]
}

export const flanSchema = new Schema<IFlan>({
  title: String,
  description: String,
  content: String,
  illustration: String,
  authorId: String,
  tags: [],
  participantIds: [],
})

const Flan = model<IFlan>('Flan', flanSchema)

export default Flan
