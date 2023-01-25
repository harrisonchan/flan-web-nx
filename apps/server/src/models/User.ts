import { Model, model, Schema, Document } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as dayjs from 'dayjs'
import isEmail from 'validator/lib/isEmail'
import { createAccessToken } from '../utils'

export interface IUser {
  _id: string
  refreshAccessTokens: string[]
  firstName: string
  lastName: string
  username: string
  birthday?: string
  email: string
  password: string
  following: string[]
  followers: string[]
  friends: string[]
}

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

type ParsedUserDocument = {
  user: IUser
  userDocument: IUserDocument
}

export interface UserModel extends Model<IUser> {
  pushRefreshAccessToken(userDocument: IUserDocument, refreshAccessToken: string): ParsedUserDocument
  checkRefreshAccessToken(id: string, refreshAccessToken: string): boolean
  login(email: string, password: string): ParsedUserDocument
  register(newUser: IUser): ParsedUserDocument
  updateUser(email: string, userDataToUpdate: IUser): ParsedUserDocument
  deleteUser(email: string, password: string): void
}

const PASSWORD_VALIDATION_REGEX = /[0-9]/
// const PASSWORD_VALIDATION_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

export const UserSchema = new Schema<IUser, UserModel>({
  refreshAccessTokens: [String],
  firstName: { type: String, required: [true, 'Please enter a first name'] },
  lastName: { type: String, required: [true, 'Please enter a last name'] },
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter a username'],
  },
  birthday: String,
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Password length is less than 8 characters'],
    validate: [PASSWORD_VALIDATION_REGEX, 'Please enter a valid password with at least 8 characters, 1 number, 1 special character'],
  },
  following: [String],
  followers: [String],
  friends: [String],
})

// UserSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10)

//     // const pw = this.password

//     this.password = await bcrypt.hash(this.password, '')
//     // this.password = await bcrypt.hash(this.password, salt)

//     // const checker = await bcrypt.compare(pw, this.password)
//     // console.log('checker', checker)
//     next()
//   } catch (error) {
//     next(error)
//   }
// })

const parseUserDocument = (userDocument: IUserDocument) => {
  const user = userDocument.toObject()
  // delete sanitized.password
  return { user, userDocument }
}

UserSchema.statics.pushRefreshAccessToken = async function (userDocument: IUserDocument, newRefreshAccessToken) {
  userDocument.refreshAccessTokens.push(newRefreshAccessToken)
  await userDocument.save()
  return '123'
}

UserSchema.statics.checkRefreshAccessToken = async function (id, refreshAccessToken) {
  const user = await this.findById(id)
  if (user && user.refreshAccessTokens.includes(refreshAccessToken)) {
    return user
  }
}

// Shouldn't need to validate here because model validation should handle it for us
UserSchema.statics.register = async function (newUser: IUser) {
  // Check uniqueness
  if (await this.findOne({ email: newUser.email })) throw Error('That email is already in use')
  if (await this.findOne({ username: newUser.username })) throw Error('That username is already in use')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newUser.password, salt)

  const registrationData = {
    ...newUser,
    password: hashedPassword,
    birthday: dayjs(newUser.birthday).format('YYYY-MM-DD').toString(),
  }

  const user = new User(registrationData)
  await user.save()
  return parseUserDocument(user)
}

UserSchema.statics.login = async function (email, password) {
  // console.log(email, password)
  const user = await this.findOne({ email })
  if (user) {
    // console.log('hello user', user)
    // const isValidAuth = user.password === password
    const isValidAuth = await bcrypt.compare(password, user.password)
    // console.log(password)
    if (isValidAuth) {
      // console.log('inside user.ts loggin success')
      return parseUserDocument(user)
    } else {
      throw Error('Check you email or pas1sword')
    }
  } else {
    throw Error(`User with email: ${email} does not exist`)
  }
}

UserSchema.statics.updateUser = async function (email, userDataToUpdate) {
  let updatedUser = await this.findOne({ email })
  if (updatedUser) {
    updatedUser = await this.findOneAndUpdate({ email }, { ...userDataToUpdate }, { new: true })
    return parseUserDocument(updatedUser)
  } else {
    throw Error(`User with email: ${email} does not exist`)
  }
}

UserSchema.statics.deleteUser = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const isValidAuth = await bcrypt.compare(password, user.password)
    if (isValidAuth) await user.delete()
    else throw Error('Check you email or password')
  } else {
    throw Error(`User with email: ${email} does not exist`)
  }
}

const User: UserModel = model<IUser, UserModel>('User', UserSchema)

export default User
