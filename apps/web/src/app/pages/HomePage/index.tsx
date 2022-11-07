import React, { useState } from 'react'
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
  return (
    <>
      <Navbar />
      <h1>Flan</h1>
      <h3>The #1 app for planning events with friends</h3>
      <p>Join 1 million+ friends!</p>
      <ReviewBox reviews={REVIEWS} />
    </>
  )
}

export default HomePage
