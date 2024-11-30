// src/components/Profile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || 'Guest',
    dateOfBirth: '1990-01-01',
    paypal: 'user@paypal.com',
    creditCard: '**** **** **** 1234',
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would also save the updated data to a backend here
    alert('Profile updated!');
  };

  const handleLogout = () => {
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <label>
          <strong>Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.username}</span>
          )}
        </label>
        <label>
          <strong>Date of Birth:</strong>
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={profileData.dateOfBirth}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.dateOfBirth}</span>
          )}
        </label>
        <label>
          <strong>PayPal:</strong>
          {isEditing ? (
            <input
              type="email"
              name="paypal"
              value={profileData.paypal}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.paypal}</span>
          )}
        </label>
        <label>
          <strong>Credit Card:</strong>
          {isEditing ? (
            <input
              type="text"
              name="creditCard"
              value={profileData.creditCard}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.creditCard}</span>
          )}
        </label>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <button className="button-colored" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="button-colored" onClick={handleEditClick}>
            Edit Profile
          </button>
        )}
        <button className="button-outlined" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
