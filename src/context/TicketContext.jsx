import { createContext, useContext, useState, useEffect } from 'react'

const TicketContext = createContext()

export const useTickets = () => {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider')
  }
  return context
}

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = () => {
    try {
      const stored = localStorage.getItem('ticketapp_tickets')
      if (stored) {
        setTickets(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load tickets:', error)
    }
    setLoading(false)
  }

  const saveTickets = (newTickets) => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(newTickets))
    setTickets(newTickets)
  }

  const createTicket = (ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newTicket = {
            id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...ticketData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          
          const updatedTickets = [...tickets, newTicket]
          saveTickets(updatedTickets)
          resolve(newTicket)
        } catch (error) {
          reject(error)
        }
      }, 300)
    })
  }

  const updateTicket = (id, ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedTickets = tickets.map(ticket =>
            ticket.id === id
              ? { ...ticket, ...ticketData, updatedAt: new Date().toISOString() }
              : ticket
          )
          
          saveTickets(updatedTickets)
          resolve(updatedTickets.find(t => t.id === id))
        } catch (error) {
          reject(error)
        }
      }, 300)
    })
  }

  const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedTickets = tickets.filter(ticket => ticket.id !== id)
          saveTickets(updatedTickets)
          resolve()
        } catch (error) {
          reject(error)
        }
      }, 300)
    })
  }

  const getTicketById = (id) => {
    return tickets.find(ticket => ticket.id === id)
  }

  const getTicketStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      in_progress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    }
  }

  const value = {
    tickets,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getTicketStats
  }

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}
