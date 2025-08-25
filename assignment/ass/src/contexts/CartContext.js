import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD': {
      const exists = state.find((it) => it.id === action.payload.id)
      if (exists) {
        return state.map((it) => it.id === action.payload.id ? { ...it, qty: it.qty + 1 } : it)
      }
      return [...state, { ...action.payload, qty: 1 }]
    }
    case 'INC':
      return state.map((it) => it.id === action.id ? { ...it, qty: it.qty + 1 } : it)
    case 'DEC':
      return state.map((it) => it.id === action.id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)
    case 'REMOVE':
      return state.filter((it) => it.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const saved = localStorage.getItem('cart_items')
    if (saved) dispatch({ type: 'INIT', payload: JSON.parse(saved) })
  }, [])
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.qty * (it.salePrice || it.price), 0),
    [items]
  )

  const value = {
    items,
    count,
    subtotal,
    addToCart: (p) => dispatch({ type: 'ADD', payload: p }),
    incQty: (id) => dispatch({ type: 'INC', id }),
    decQty: (id) => dispatch({ type: 'DEC', id }),
    removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
    clearCart: () => dispatch({ type: 'CLEAR' })
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
