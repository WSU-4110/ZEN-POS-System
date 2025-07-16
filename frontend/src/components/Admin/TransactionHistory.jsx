import React, { useState, useMemo } from 'react'
import { format } from 'date-fns'
import './TransactionHistory.css'

export default function TransactionHistory({ transactions, onRefresh }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })

    const displayedTransactions = useMemo(() => {
        let itemsArray = transactions.map(tx => ({
            id:            tx.id,
            date:          new Date(tx.timestamp),
            items:         tx.items,
            total:         tx.totalAmount,
            paymentMethod: tx.paymentMethod,
            employee:      tx.employee,
            status:        tx.status,
            promotional:   tx.promotional
        }))

        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            itemsArray = itemsArray.filter(t =>
                String(t.id).includes(term) ||
                t.employee.toLowerCase().includes(term) ||
                t.paymentMethod.toLowerCase().includes(term)
            )
        }

        if (filterStatus !== 'all') {
            itemsArray = itemsArray.filter(t => t.status === filterStatus)
        }

        itemsArray.sort((a, b) => {
            const dir = sortConfig.direction === 'asc' ? 1 : -1
            if (sortConfig.key === 'date') return dir * (a.date - b.date)
            if (a[sortConfig.key] < b[sortConfig.key]) return -dir
            if (a[sortConfig.key] > b[sortConfig.key]) return dir
            return 0
        })

        return itemsArray
    }, [transactions, searchTerm, filterStatus, sortConfig])

    const requestSort = key => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc'
        setSortConfig({ key, direction })
    }

    return (
        <div className="transaction-history-container">
            <div className="transaction-header d-flex align-items-center mb-3">
                <h2 className="me-auto">Transaction History</h2>
                <button className="btn btn-primary me-2" onClick={onRefresh}>↻ Refresh</button>
                <input
                    type="text"
                    placeholder="Search…"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="form-control me-2"
                    style={{ maxWidth: '200px' }}
                />
                <select
                    className="form-select"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    style={{ maxWidth: '150px' }}
                >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="refunded">Refunded</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
            <div className="transaction-table-container">
                <table className="table table-striped transaction-table">
                    <thead>
                    <tr>
                        <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
                            ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => requestSort('date')} style={{ cursor: 'pointer' }}>
                            Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Items</th>
                        <th onClick={() => requestSort('total')} style={{ cursor: 'pointer' }}>
                            Total {sortConfig.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Payment</th>
                        <th>Employee</th>
                        <th>Status</th>
                        <th>Promo?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedTransactions.map(tx => (
                        <tr key={tx.id}>
                            <td>{tx.id}</td>
                            <td>{format(tx.date, 'MMM d, yyyy hh:mm a')}</td>
                            <td>
                                {tx.items.map((i, idx) => (
                                    <div key={idx}>
                                        {i.quantity}× {i.itemName} (${i.price.toFixed(2)})
                                    </div>
                                ))}
                            </td>
                            <td>${tx.total.toFixed(2)}</td>
                            <td>{tx.paymentMethod}</td>
                            <td>{tx.employee}</td>
                            <td>
                  <span className={
                      tx.status === 'completed' ? 'badge bg-success' :
                          tx.status === 'refunded'  ? 'badge bg-warning' : 'badge bg-secondary'
                  }>
                    {tx.status}
                  </span>
                            </td>
                            <td>{tx.promotional ? '✔️' : '—'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
