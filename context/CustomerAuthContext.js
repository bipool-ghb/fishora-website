'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CustomerAuthContext = createContext(null)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, restore session from localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('fishora_customer_token')
      const savedCustomer = localStorage.getItem('fishora_customer')
      if (savedToken) {
        setToken(savedToken)
        if (savedCustomer) setCustomer(JSON.parse(savedCustomer))
        // Validate token with /me endpoint
        fetch(`${API_URL}/api/v1/customer-auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
          .then(r => r.json())
          .then(data => {
            if (data.success && data.data) {
              setCustomer(data.data)
              localStorage.setItem('fishora_customer', JSON.stringify(data.data))
            } else {
              // Token invalid, clear
              setToken(null)
              setCustomer(null)
              localStorage.removeItem('fishora_customer_token')
              localStorage.removeItem('fishora_customer')
            }
          })
          .catch(() => {
            // Network error — keep cached data
          })
          .finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (phone, password) => {
    const res = await fetch(`${API_URL}/api/v1/customer-auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Login failed')
    const { token: t, customer: c } = data.data
    setToken(t)
    setCustomer(c)
    localStorage.setItem('fishora_customer_token', t)
    localStorage.setItem('fishora_customer', JSON.stringify(c))
    return c
  }, [])

  const register = useCallback(async (formData) => {
    const res = await fetch(`${API_URL}/api/v1/customer-auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Registration failed')
    return data
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setCustomer(null)
    localStorage.removeItem('fishora_customer_token')
    localStorage.removeItem('fishora_customer')
  }, [])

  const isLoggedIn = !!token && !!customer

  return (
    <CustomerAuthContext.Provider value={{ customer, token, login, register, logout, isLoggedIn, loading }}>
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() { return useContext(CustomerAuthContext) }
