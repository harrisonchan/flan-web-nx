import React from 'react'

interface ReviewProps {
  avatarUrl: string
  username: string
  rating: string
  review: string
}

const Review: React.FC<ReviewProps> = (props) => {
  return (
    <div>
      <img src={props.avatarUrl} alt="avatar" width={100} height={100}></img>
      <h2>{props.username}</h2>
      <h2>{props.rating}</h2>
      <h3>{props.review}</h3>
    </div>
  )
}

interface ReviewBoxProps {
  reviews:
    | {
        avatarUrl: string
        username: string
        rating: string
        review: string
      }[]
    | undefined
}

const ReviewBox: React.FC<ReviewBoxProps> = (props) => {
  return (
    <>
      {props.reviews &&
        props.reviews.map((item) => {
          return (
            <Review
              avatarUrl={item.avatarUrl}
              username={item.username}
              rating={item.rating}
              review={item.review}
            />
          )
        })}
    </>
  )
}

export default ReviewBox
