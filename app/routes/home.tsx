import React from 'react';
import type { FC } from 'react';
import { Welcome } from '../welcome/welcome'; // named import

const Home: FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Welcome />
    </div>
  );
};

export default Home;
