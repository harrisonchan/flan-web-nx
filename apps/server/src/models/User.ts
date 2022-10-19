import { model, Schema } from 'mongoose'

interface IUser {
  firstName: string
  lastName: string
  username: string
  birthday: string
  email: string
  password: string
}

export const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  username: String,
  birthday: String,
  email: String,
  password: String,
})

const User = model<IUser>('User', userSchema)

export default User
