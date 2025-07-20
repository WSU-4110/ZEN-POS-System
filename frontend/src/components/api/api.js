import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});



export async function fetchCart(user) {
  const res = await api.get('/cart', { params: { user } });
  return res.data;
}

export async function postCartItemCustom(user, item) {
  const res = await api.post(`/cart/addCustom?user=${user}`, item);
  return res.data;
}

export async function deleteCartItem(user, index) {
  const res = await api.delete('/cart', { params: { user, index } });
  return res.data;
}

export async function clearCartItems(user) {
  const res = await api.post(`/cart/clear?user=${user}`);
  return res.data;
}



export async function fetchTransactions() {
  const res = await api.get('/transactions');
  return res.data;
}

export async function postTransaction(transaction) {
  const res = await api.post('/transactions', transaction);
  return res.data;
}

export async function fetchReceiptByPhone(phoneNumber) {
  const res = await api.get('/transactions', { params: { phoneNumber } });
  return res.data;
}



export async function fetchInventory() {
  const res = await api.get('/inventory');
  return res.data;
}

export async function createInventory(payload) {
  const res = await api.post('/inventory', payload);
  return res.data;
}

export async function updateInventory(id, payload) {
  const res = await api.put(`/inventory/${id}`, payload);
  return res.data;
}

export async function deleteInventory(id) {
  await api.delete(`/inventory/${id}`);
}



export async function fetchDepartments() {
  const res = await api.get('/departments');
  return res.data;
}


export async function applyRewards(phoneNumber) {
  const res = await api.post('/rewards/enroll', { phoneNumber });
  return res.data.discount || 0;
}



export async function fetchDailyReport() {
  const res = await api.get('/reports/daily');
  return res.data;
}



export async function pinLogin(pin) {
  const res = await api.post('/admin/pin-login', { pin });
  return res.data;
}


export async function fetchEmployees() {
  const res = await api.get('/manager/employees');
  return res.data;
}

export async function createEmployee(emp) {
  const res = await api.post('/manager/employees', emp);
  return res.data;
}

export async function updateEmployee(id, emp) {
  const res = await api.put(`/manager/employees/${id}`, emp);
  return res.data;
}

export async function deleteEmployee(id) {
  await api.delete(`/manager/employees/${id}`);
}

export default api;
