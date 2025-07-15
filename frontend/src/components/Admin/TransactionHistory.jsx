import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';

const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default function TransactionHistory({ transactions, onRefresh }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    const [displayedTransactions, setDisplayedTransactions] = useState([
        {
            id: 'T1001',
            date: new Date('2023-05-15T10:30:00'),
            items: [
                { name: 'Milk', price: 2.99, quantity: 2 },
                { name: 'Bread', price: 1.99, quantity: 1 }
            ],
            total: 7.97,
            paymentMethod: 'Credit Card',
            status: 'completed',
            employee: 'John Doe'
        }
    ]);

    useEffect(() => {
        let filtered = [...displayedTransactions];

        if (searchTerm) {
            filtered = filtered.filter(transaction =>
                transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(transaction => transaction.status === filterStatus);
        }

        filtered.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setDisplayedTransactions(filtered);
    }, [displayedTransactions, searchTerm, filterStatus, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="transaction-history-container">
            <div className="transaction-header">
                <h2>Transaction History</h2>
                <div className="transaction-controls">
                    <button className="btn btn-primary me-2" onClick={onRefresh}>
                        <i className="bi bi-arrow-clockwise"></i> Refresh
                    </button>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control"
                        />
                        <i className="bi bi-search search-icon"></i>
                    </div>
                    <select
                        className="form-select ms-2"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="refunded">Refunded</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="transaction-table-container">
                <table className="transaction-table">
                    <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>
                            ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => requestSort('date')}>
                            Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Items</th>
                        <th onClick={() => requestSort('total')}>
                            Total {sortConfig.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Payment</th>
                        <th>Employee</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{formatDate(transaction.date)}</td>
                            <td>
                                <div className="transaction-items">
                                    {transaction.items.map((item, index) => (
                                        <div key={index} className="transaction-item">
                                            {item.quantity}x {item.name} (${item.price.toFixed(2)})
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td>${transaction.total.toFixed(2)}</td>
                            <td>{transaction.paymentMethod}</td>
                            <td>{transaction.employee}</td>
                            <td>
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status}
                  </span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="bi bi-receipt"></i> Receipt
                                </button>
                                {transaction.status === 'completed' && (
                                    <button className="btn btn-sm btn-outline-danger">
                                        <i className="bi bi-arrow-counterclockwise"></i> Refund
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}