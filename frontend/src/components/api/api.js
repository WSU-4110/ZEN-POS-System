import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export async function fetchCart(user) {
  const res = await api.get('/cart', { params: { user } })
  return res.data
}

export async function deleteCartItem(user, index) {
  const res = await api.delete('/cart', { params: { user, index } })
  return res.data
}

export async function postTransaction(transaction) {
  const res = await api.post('/transactions', transaction)
  return res.data
}

export async function fetchReceiptByPhone(phoneNumber) {
  const res = await api.get('/orders', { params: { phoneNumber } })
  return res.data
}

export async function fetchLatestReceipt() {
  const res = await api.get('/orders/latest')
  return res.data
}

export default api