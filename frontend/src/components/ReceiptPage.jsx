import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { fetchReceiptByPhone, fetchLatestReceipt } from './api/api'

export default function ReceiptPage() {
    const { state } = useLocation()
    const navigate  = useNavigate()
    const phone     = state?.phoneNumber
    const [receipt, setReceipt] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                const data = phone
                    ? await fetchReceiptByPhone(phone)
                    : await fetchLatestReceipt()
                setReceipt(data)
            } catch {
                navigate('/rewards')
            }
        })()
    }, [phone, navigate])

    if (!receipt) return <p>Loading receipt…</p>

    return (
        <div>
            <h2>Receipt #{receipt.id}</h2>
            <p>Date: {format(new Date(receipt.createdAt), 'MMM d, yyyy hh:mm a')}</p>
            {phone && <p>Phone: {phone}</p>}
            <ul>
                {receipt.items.map(i => (
                    <li key={i.id}>{i.name} × {i.quantity} — ${i.price.toFixed(2)}</li>
                ))}
            </ul>
            <h3>Total: ${receipt.total.toFixed(2)}</h3>
            <button onClick={() => navigate('/rewards')}>
                Continue Shopping
            </button>
        </div>
    )
}