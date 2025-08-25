import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useAuth } from './AuthContext.js'
import { patchAccount } from '../utils/api.js'

const WishlistContext = createContext()
export const useWishlist = () => useContext(WishlistContext)

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD':
      if (state.find((p) => p.id === action.payload.id)) return state
      return [...state, action.payload]
    case 'REMOVE':
      return state.filter((p) => p.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(reducer, [])
  const { user } = useAuth()

  useEffect(() => {
    const saved = localStorage.getItem('wishlist_items')
    if (saved) dispatch({ type: 'INIT', payload: JSON.parse(saved) })
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist_items', JSON.stringify(wishlist))
  }, [wishlist])

  // Sync vào tài khoản (nếu đã login) → lưu danh sách id
  useEffect(() => {
    async function sync() {
      if (!user) return
      const ids = wishlist.map((w) => w.id)
      try { await patchAccount(user.id, { wishlist: ids }) } catch {}
    }
    sync()
  }, [wishlist, user])

  const value = {
    wishlist,
    addToWishlist: (p) => dispatch({ type: 'ADD', payload: p }),
    removeFromWishlist: (id) => dispatch({ type: 'REMOVE', id }),
    clearWishlist: () => dispatch({ type: 'CLEAR' })
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
