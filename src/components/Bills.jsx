// src/components/Bills.js
import React, { useState, useEffect } from 'react';

function Bills({ filterLastMonths }) {
  const initialTransactions = [
    { id: 1, date: '2023-01-15', restaurant: 'Pizza Palace', amount: 40.0, friends: ['Alice', 'Bob'], status: 'Paid' },
    { id: 2, date: '2023-02-10', restaurant: 'Sushi Spot', amount: 65.0, friends: ['Charlie'], status: 'Unpaid' },
    { id: 3, date: '2023-03-05', restaurant: 'Burger Haven', amount: 25.0, friends: ['Alice', 'Dave'], status: 'Paid' },
    { id: 4, date: '2023-03-22', restaurant: 'Pasta Place', amount: 55.0, friends: ['Bob', 'Eve'], status: 'Unpaid' },
    { id: 5, date: '2023-04-10', restaurant: 'Taco Town', amount: 30.0, friends: ['Charlie', 'Dave'], status: 'Paid' },
    { id: 6, date: '2023-04-20', restaurant: 'Steakhouse Deluxe', amount: 100.0, friends: ['Alice', 'Eve', 'Bob'], status: 'Paid' },
    { id: 7, date: '2023-08-01', restaurant: 'Noodle House', amount: 40.0, friends: ['Bob'], status: 'Paid' },
    { id: 8, date: '2023-09-10', restaurant: 'Mexican Grill', amount: 70.0, friends: ['Alice'], status: 'Unpaid' },
  ];

  const [transactions, setTransactions] = useState(initialTransactions.map((t) => ({ ...t, expanded: false })));
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    let filteredTransactions = initialTransactions;

    if (filterLastMonths) {
      const filterDate = new Date();
      filterDate.setMonth(filterDate.getMonth() - filterLastMonths);

      filteredTransactions = initialTransactions.filter(transaction => {
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
