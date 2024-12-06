import React, { useState, useEffect } from 'react';

function Friends() {
  // Load friends from localStorage or initialize with an empty array
  const loadFriendsFromStorage = () => {
    const savedFriends = localStorage.getItem('friends');
    return savedFriends ? JSON.parse(savedFriends) : [];
  };

  const [friends, setFriends] = useState(loadFriendsFromStorage);

  // State for the new friend input
  const [newFriend, setNewFriend] = useState('');

  // Update localStorage whenever friends list changes
  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  // Handle adding a new friend
  const handleAddFriend = () => {
    if (newFriend.trim()) {
      setFriends([...friends, { name: newFriend, amountOwed: 0 }]);
      setNewFriend(''); // Clear the input after adding
    }
  };

  return (
    <div className="friends-page">
      <h3>Friends</h3>

      {/* Add Friend Input and Button - Stacked */}
      <div className="add-friend-section">
        <input
          type="text"
          placeholder="Enter friend's name"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
        />
        <button onClick={handleAddFriend}>Add Friend</button>
      </div>

      {/* List of Friends with Amount Owed */}
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className="friend-item">
            {friend.name} - 
            <span className={friend.amountOwed >= 0 ? 'owe' : 'owed'}>
              ${Math.abs(friend.amountOwed).toFixed(2)} {friend.amountOwed >= 0 ? 'owed' : 'owes you'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
