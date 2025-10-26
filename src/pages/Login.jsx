import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      try {
        await login(email, password)
        showSuccess('Login successful! Welcome back.')
        navigate('/dashboard')
      } catch (error) {
        showError(error.message || 'Login failed. Please check your credentials.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? 'error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-link">
          <p>
            Don't have an account?{' '}
            <Link to="/auth/signup">Sign up here</Link>
          </p>
        </div>

        <div style={{ marginTop: '2rem', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px', fontSize: '0.875rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '8px' }}>Demo Credentials:</p>
          <p>Email: demo@ticket.com</p>
          <p>Password: demo123</p>
          <p style={{ marginTop: '8px', fontSize: '0.75rem', color: '#6b7280' }}>
            (Or create a new account)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
