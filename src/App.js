// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Bills from './components/Bills';
import Friends from './components/Friends';
import Camera from './components/Camera';

function App() {
  const [user, setUser] = useState(null); // Manages user state

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} /> {/* Include Navbar */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/camera" element={<Camera />} />

      </Routes>
    </div>
  );
}

export default App;
