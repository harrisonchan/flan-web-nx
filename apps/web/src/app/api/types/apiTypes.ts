export type User = {
  _id: string
  firstName: string
  lastName: string
  username: string
  birthday?: string
  email: string
  following: string[]
  followers: string[]
  friends: string[]
}

export type UserRegisterType = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  birthday?: string
}
