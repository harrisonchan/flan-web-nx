import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import ReviewBox from '../../components/ReviewBox'

const REVIEWS = [
  {
    avatarUrl:
      'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    username: 'arxbombus',
    rating: '4/5',
    review: 'shitty app',
  },
]

const HomePage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <>
      <Navbar />
      <h1>Flan</h1>
      <h3>The #1 app for planning events with friends</h3>
      <p>Join 1 million+ friends!</p>
      <ReviewBox reviews={REVIEWS} />
      {/* Account register form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.submitForm()
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange('firstName')}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange('lastName')}
        />
        <input
          type="text"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange('username')}
        />
        <input
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
        />
        <input
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange('confirmPassword')}
        />
        <input
          placeholder="Birthday"
          type="date"
          value={formik.values.birthday}
          onChange={formik.handleChange('birthday')}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default HomePage
