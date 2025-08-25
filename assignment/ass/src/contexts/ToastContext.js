import React, { createContext, useContext, useState, useCallback } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastContext = createContext()
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((variant, message) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, variant, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer className="p-3" position="top-end">
        {toasts.map((t) => (
          <Toast bg={t.variant} key={t.id}>
            <Toast.Body className="text-white">{t.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}
