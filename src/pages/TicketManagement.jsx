import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTickets } from '../context/TicketContext'
import { useToast } from '../context/ToastContext'
import Footer from '../components/Footer'

const TicketManagement = () => {
  const { logout } = useAuth()
  const { tickets, createTicket, updateTicket, deleteTicket } = useTickets()
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [showModal, setShowModal] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowModal(true)
    }
  }, [searchParams])

  const validateForm = () => {
    const errors = {}

    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters'
    }

    if (!formData.status) {
      errors.status = 'Status is required'
    } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      errors.status = 'Status must be one of: open, in_progress, closed'
    }

    if (formData.description && formData.description.length > 500) {
      errors.description = 'Description must not exceed 500 characters'
    }

    return errors
  }

  const handleOpenModal = (ticket = null) => {
    if (ticket) {
      setEditingTicket(ticket)
      setFormData({
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority || 'medium'
      })
    } else {
      setEditingTicket(null)
      setFormData({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      })
    }
    setFormErrors({})
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTicket(null)
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    })
    setFormErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm()
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      try {
        if (editingTicket) {
          await updateTicket(editingTicket.id, formData)
          showSuccess('Ticket updated successfully!')
        } else {
          await createTicket(formData)
          showSuccess('Ticket created successfully!')
        }
        handleCloseModal()
      } catch (error) {
        showError(error.message || 'Failed to save ticket. Please try again.')
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id)
      showSuccess('Ticket deleted successfully!')
      setDeleteConfirm(null)
    } catch (error) {
      showError('Failed to delete ticket. Please try again.')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="page-title" style={{ margin: 0 }}>Ticket Management</h1>
            <button
              onClick={() => handleOpenModal()}
              className="btn btn-success"
            >
              + Create New Ticket
            </button>
          </div>

          {tickets.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Tickets Yet</h2>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                Get started by creating your first ticket
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="btn btn-primary"
              >
                Create Your First Ticket
              </button>
            </div>
          ) : (
            <div className="ticket-list">
              {tickets.map((ticket) => (
                <div key={ticket.id} className={`ticket-card ${ticket.status}`}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3>{ticket.title}</h3>
                    <span className={`status-badge status-${ticket.status}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {ticket.description && (
                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                      {ticket.description}
                    </p>
                  )}

                  <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem' }}>
                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>

                  <div className="ticket-actions">
                    <button
                      onClick={() => handleOpenModal(ticket)}
                      className="btn btn-primary btn-small"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(ticket.id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
              <button
                className="modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  className={`form-control ${formErrors.title ? 'error' : ''}`}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter ticket title"
                  aria-invalid={formErrors.title ? 'true' : 'false'}
                  aria-describedby={formErrors.title ? 'title-error' : undefined}
                />
                {formErrors.title && (
                  <span id="title-error" className="error-message" role="alert">
                    {formErrors.title}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className={`form-control ${formErrors.description ? 'error' : ''}`}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter ticket description (optional)"
                  rows="4"
                  aria-invalid={formErrors.description ? 'true' : 'false'}
                  aria-describedby={formErrors.description ? 'description-error' : undefined}
                />
                {formErrors.description && (
                  <span id="description-error" className="error-message" role="alert">
                    {formErrors.description}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  className={`form-control ${formErrors.status ? 'error' : ''}`}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  aria-invalid={formErrors.status ? 'true' : 'false'}
                  aria-describedby={formErrors.status ? 'status-error' : undefined}
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {formErrors.status && (
                  <span id="status-error" className="error-message" role="alert">
                    {formErrors.status}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  className="form-control"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button
                className="modal-close"
                onClick={() => setDeleteConfirm(null)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
              Are you sure you want to delete this ticket? This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn btn-danger"
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default TicketManagement
