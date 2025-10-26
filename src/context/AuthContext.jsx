import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        const userData = JSON.parse(session)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('ticketapp_session')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        const mockUsers = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
        const foundUser = mockUsers.find(u => u.email === email && u.password === password)
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          }
          localStorage.setItem('ticketapp_session', JSON.stringify(userData))
          setUser(userData)
          resolve(userData)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 500)
    })
  }

  const signup = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUsers = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
        
        // Check if user already exists
        if (mockUsers.find(u => u.email === email)) {
          reject(new Error('User with this email already exists'))
          return
        }

        const newUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          password
        }

        mockUsers.push(newUser)
        localStorage.setItem('ticketapp_users', JSON.stringify(mockUsers))

        const userData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
        
        localStorage.setItem('ticketapp_session', JSON.stringify(userData))
        setUser(userData)
        resolve(userData)
      }, 500)
    })
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
