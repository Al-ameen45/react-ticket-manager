import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTickets } from '../context/TicketContext'
import Footer from '../components/Footer'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { getTicketStats } = useTickets()
  const navigate = useNavigate()

  const ticketStats = getTicketStats()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const statisticCards = [
    {
      title: 'Total Tickets',
      count: ticketStats.total,
      style: {}
    },
    {
      title: 'Open Tickets',
      count: ticketStats.open,
      style: { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }
    },
    {
      title: 'In Progress',
      count: ticketStats.in_progress,
      style: { background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }
    },
    {
      title: 'Resolved Tickets',
      count: ticketStats.closed,
      style: { background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' }
    }
  ]

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-brand">
            Ticket Manager
          </Link>
          <div className="navbar-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tickets">Tickets</Link>
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-small"
              style={{ marginLeft: '1rem' }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="page-container">
        <div className="app-container">
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="page-title">Welcome back, {user?.name}! 👋</h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Here's an overview of your ticket management system
            </p>
          </div>

          <div className="stats-grid">
            {statisticCards.map((stat, index) => (
              <div key={index} className="stat-card" style={stat.style}>
                <h3>{stat.count}</h3>
                <p>{stat.title}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <div className="card">
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                Quick Actions
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                Manage your tickets efficiently with these quick links
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/tickets" className="btn btn-primary">
                  View All Tickets
                </Link>
                <Link to="/tickets?action=create" className="btn btn-success">
                  Create New Ticket
                </Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
              Recent Activity
            </h2>
            <div className="grid grid-2">
              <div className="card">
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '0.5rem', 
                  color: '#10b981' 
                }}>
                  ✅ System Status
                </h3>
                <p style={{ color: '#6b7280' }}>
                  All systems operational. Your tickets are being tracked and managed efficiently.
                </p>
              </div>

              <div className="card">
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '0.5rem', 
                  color: '#4f46e5' 
                }}>
                  📊 Performance
                </h3>
                <p style={{ color: '#6b7280' }}>
                  You have {ticketStats.open} open tickets that need attention. Keep up the great work!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
