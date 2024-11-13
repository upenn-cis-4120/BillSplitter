// src/components/Dashboard.js
import React from 'react';
import Bills from './Bills';

function Dashboard({ user, currentBalance }) {
  return (
    <div className="dashboard">
      <h2>Welcome, {user?.username}</h2>
      
      {/* Display Current Balance */}
      <div className="balance-section">
        <h3>Current Balance: $937.64</h3>
      </div>
      
      {/* Bills Section */}
      <div>
        <Bills filterLastMonths={2} />
      </div>
    </div>
  );
}

export default Dashboard;


