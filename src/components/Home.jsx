import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import logo from '../assets/logo512.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home" style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ margin: '50px auto' }}>
        <img 
          src={logo} 
          alt="BillSplitter Logo" 
          style={{ maxWidth: '200px', height: 'auto' }} 
        />
      </div>
      <div style={{ marginTop: '50px' }}>
        <Button 
          text="Create account" 
          onClick={() => navigate('/register')} 
          className="button-colored" // Custom class for outlined button
        />
        <Button
          text="Log in" 
          onClick={() => navigate('/login')} 
          className="button-outlined" // Custom class for colored button
        />
        <Button
          text="About BillSplitter" 
          onClick={() => navigate('/about')} 
          className="button-colored" // Custom class for colored button
        />
      </div>
    </div>
  );
}

export default Home;
