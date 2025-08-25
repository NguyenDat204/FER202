const API = 'http://localhost:5000'

// ====== Helper methods ======
export async function apiGet(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`GET ${path} failed`)
  return res.json()
}

export async function apiPost(path, data) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`POST ${path} failed`)
  return res.json()
}

export async function apiPatch(path, data) {
  const res = await fetch(`${API}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`PATCH ${path} failed`)
  return res.json()
}

// ====== Products ======
export const getProducts = () => apiGet('/products')
export const getProduct = (id) => apiGet(`/products/${id}`)

// ====== Accounts ======
export const findAccountByEmail = async (email) => {
  const arr = await apiGet(`/accounts?email=${encodeURIComponent(email)}`)
  return Array.isArray(arr) && arr.length ? arr[0] : null
}

export const getAccountById = (id) => apiGet(`/accounts/${id}`)

// Tạo account mới với id tăng dần
export const createAccount = async (data) => {
  const accounts = await apiGet('/accounts')
  const numericIds = accounts
    .map(acc => parseInt(acc.id))
    .filter(id => !isNaN(id))

  const newId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1

  const payload = {
    ...data,
    id: newId,
    wishlist: data.wishlist || [],
    cart: data.cart || []
  }

  return apiPost('/accounts', payload)
}


export const patchAccount = (id, data) => apiPatch(`/accounts/${id}`, data)

// ====== Orders ======
export const createOrder = (data) => apiPost('/orders', data)
