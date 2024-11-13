// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function Home({ user }) {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      <h1>Welcome to MyApp!</h1>
      {user ? (
        <div className="home-buttons">
          <Button text="Go to Bills" onClick={() => goToPage('/bills')} />
          <Button text="Go to Friends" onClick={() => goToPage('/friends')} />
          <Button text="Take a Picture" onClick={() => goToPage('/camera')} />
        </div>
      ) : (
        <p>Please register or log in to access your dashboard.</p>
      )}
    </div>
  );
}

export default Home;
