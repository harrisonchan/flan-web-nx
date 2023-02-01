import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { userApi } from '../../api'

const HomePage = () => {
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      loginMutation.mutate(values)
    },
  })
  const loginMutation = useMutation((values: { email: string; password: string }) => userApi.post('/login', values), {
    onSuccess: (data) => {
      console.log(data)
      console.log()
      const { firstName, lastName, email, username } = data.data.user
      alert(`Welcome ${firstName} ${lastName} (${email})! Access token: ${data.data.accessTokens.accessToken}`)
    },
  })

  return (
    <div>
      <h3>Login</h3>
      <form>
        <input type="text" name="email" placeholder="email" onChange={loginFormik.handleChange} value={loginFormik.values.email} />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={loginFormik.handleChange}
          value={loginFormik.values.password}
        />
        <input
          type="submit"
          value="Login"
          onClick={(e) => {
            e.preventDefault()
            loginFormik.handleSubmit()
          }}
        />
      </form>
      <button
        onClick={() => {
          axios.get('http://localhost:3333/api/user/auth-test').then((res) => {
            console.log(res)
          })
        }}
      >
        Test
      </button>
    </div>
  )
}
export default HomePage
