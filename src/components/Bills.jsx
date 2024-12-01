import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Bills({ filterLastMonths }) {
  const [transactions, setTransactions] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load receipts from local storage
    const storedReceipts = JSON.parse(localStorage.getItem('receipts')) || [];
    let filteredTransactions = storedReceipts;

    if (filterLastMonths) {
      const filterDate = new Date();
      filterDate.setMonth(filterDate.getMonth() - filterLastMonths);

      filteredTransactions = storedReceipts.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= filterDate;
      });
    }

    setTransactions(filteredTransactions.map((t) => ({ ...t, expanded: false })));
  }, [filterLastMonths]);

  // Sort transactions based on the selected option
  const handleSort = (option) => {
    setSortOption(option);

    const sortedTransactions = [...transactions];

    switch (option) {
      case 'amount':
        sortedTransactions.sort((a, b) => a.amount - b.amount);
        break;
      case 'date':
        sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'friends':
        sortedTransactions.sort((a, b) => a.friends.join(', ').localeCompare(b.friends.join(', ')));
        break;
      case 'status':
        sortedTransactions.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    setTransactions(sortedTransactions);
  };

  // Toggle expansion of transaction details
  const toggleExpand = (id) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === id
        ? { ...transaction, expanded: !transaction.expanded }
        : transaction
    ));
  };

  // Mark a transaction as paid or unpaid
  const togglePaidStatus = (id) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === id
        ? { ...transaction, status: transaction.status === 'Paid' ? 'Unpaid' : 'Paid' }
        : transaction
    ));

    // Update local storage
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === id
        ? { ...transaction, status: transaction.status === 'Paid' ? 'Unpaid' : 'Paid' }
        : transaction
    );
    localStorage.setItem('receipts', JSON.stringify(updatedTransactions));
  };

  // Send receipt to a friend (placeholder function)
  const handleSendToFriend = (transaction) => {
    alert(`Sending receipt for ${transaction.restaurant} to ${transaction.friends.join(', ')}`);
  };

  // Navigate to Receipt Editor to add details to a new receipt
  const handleAddReceipt = () => {
    navigate('/camera');
  };

  return (
    <div className="bills-page">
      <h2>{filterLastMonths ? `Recent Transactions (Last ${filterLastMonths} Months)` : 'All Restaurant Transactions'}</h2>

      {/* Sorting Dropdown */}
      <div className="sort-options">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Select</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
          <option value="friends">Person</option>
          <option value="status">Status (Paid/Unpaid)</option>
        </select>
      </div>

      <button onClick={handleAddReceipt} className="add-receipt-button">
        Add New Receipt
      </button>

      <div className="transactions-list">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <p onClick={() => toggleExpand(transaction.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Date: {transaction.date}
                {transaction.expanded ? ' ▲' : ' ▼'}
              </p>
              {transaction.expanded && (
                <div className="transaction-details">
                  <p><strong>Restaurant:</strong> {transaction.restaurant}</p>
                  <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                  <p><strong>Friends:</strong> {transaction.friends.join(', ')}</p>
                  <p className={`status ${transaction.status.toLowerCase()}`}>
                    <strong>Status:</strong> {transaction.status}
                  </p>
                  {transaction.image && (
                    <div className="receipt-image">
                      <h4>Receipt Image:</h4>
                      <img src={transaction.image} alt="Receipt" style={{ maxWidth: '100%' }} />
                    </div>
                  )}
                  <div className="transaction-actions">
                    <button onClick={() => togglePaidStatus(transaction.id)} className="toggle-paid-button">
                      Mark as {transaction.status === 'Paid' ? 'Unpaid' : 'Paid'}
                    </button>
                    <button onClick={() => handleSendToFriend(transaction)} className="send-friend-button">
                      Send to Friend
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No transactions found for the last {filterLastMonths} months.</p>
        )}
      </div>
    </div>
  );
}

export default Bills;