import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TicketProvider } from './context/TicketContext'
import { ToastProvider } from './context/ToastContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import TicketManagement from './pages/TicketManagement'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <TicketProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <ProtectedRoute>
                    <TicketManagement />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </TicketProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  )
}

export default App
