// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (typeof setUser === 'function') { // Ensure setUser is a function
      setUser({ username }); // Set the user state with username (or user data)
      navigate('/dashboard'); // Redirect to the Home page
    } else {
      console.error("setUser is not a function");
    }
  };

  return (
    <div className="register">
      <h2>Log in</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default Login;
