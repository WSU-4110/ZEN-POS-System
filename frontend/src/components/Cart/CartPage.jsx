import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCart, deleteCartItem, postTransaction } from '../api/api'

export default function CartPage() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = localStorage.getItem('user') || 'guest'
  const phone = localStorage.getItem('phoneNumber')

  const loadCart = async () => {
    setLoading(true)
    try {
      const data = await fetchCart(user)
      setEntries(data)
    } catch {
      setEntries([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const handleRemove = async idx => {
    await deleteCartItem(user, idx)
    await loadCart()
  }

  const subtotal = entries.reduce((sum, e) => sum + e.price * e.quantity, 0)

  const handlePlaceOrder = async () => {
    if (!entries.length) return
    await postTransaction({
      totalAmount:   subtotal,
      employee:      user,
      status:        'completed',
      paymentMethod: 'Cash',
      promotional:   false,
      items:         entries.map(e => ({
        itemName: e.name,
        quantity: e.quantity,
        price:    e.price
      }))
    })
    for (let i = entries.length - 1; i >= 0; i--) {
      await deleteCartItem(user, i)
    }
    navigate ('/receipts', { state: { phoneNumber: phone } })
  }

  if (loading) return <p>Loading cart…</p>

  return (
      <div className="row">
        <div className="col-12 mb-3">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>
        <div className="col-md-8">
          <h2>Your Cart</h2>
          {entries.length === 0
              ? <p>Your cart is empty.</p>
              : (
                  <ul className="list-group mb-3">
                    {entries.map((e, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                          <div><strong>{e.name}</strong> × {e.quantity}</div>
                          <div className="d-flex align-items-center">
                            <span className="me-3">${(e.price * e.quantity).toFixed(2)}</span>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(idx)}>Remove</button>
                          </div>
                        </li>
                    ))}
                  </ul>
              )}
          <div className="d-flex justify-content-between mb-4">
            <strong>Subtotal:</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <button className="btn btn-success" onClick={handlePlaceOrder} disabled={!entries.length}>Place Order</button>
        </div>
      </div>
  )
}
