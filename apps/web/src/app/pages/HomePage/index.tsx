import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div>Hello, this is your home page</div>
      <Link to={'/about'}>go to the about page</Link>
    </>
  );
};

export default HomePage;
