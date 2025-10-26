import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const LandingPage = () => {
  const navigate = useNavigate()

  // Handle signup button click
  const handleGetStarted = () => {
    navigate('/auth/signup')
  }

  return (
    <div>
      {/* Hero Section with wavy background */}
      <div className="hero-section">
        {/* Decorative background circles */}
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        
        <div className="hero-content">
          <h1>Ticket Manager </h1>
          <p>
            Streamline your workflow with our powerful ticket management system.
            Track, organize, and resolve tickets with ease across multiple platforms.
          </p>
          
          {/* Call-to-action buttons */}
          <div className="hero-buttons">
            <Link to="/auth/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/auth/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="app-container" style={{ padding: '60px 20px' }}>
        {/* Section heading */}
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          marginBottom: '3rem' 
        }}>
          Why Choose Ticket Manager?
        </h2>
        
        {/* Feature cards grid */}
        <div className="grid grid-3">
          {/* Easy Organization Feature */}
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Easy Organization
            </h3>
            <p style={{ color: '#6b7280' }}>
              Keep all your tickets organized in one place. Create, update, and track
              the status of every ticket effortlessly.
            </p>
          </div>

          {/* Lightning Fast Feature */}
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Lightning Fast
            </h3>
            <p style={{ color: '#6b7280' }}>
              Built with modern technologies for optimal performance. Get instant
              updates and seamless user experience.
            </p>
          </div>

          {/* Secure & Reliable Feature */}
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Secure & Reliable
            </h3>
            <p style={{ color: '#6b7280' }}>
              Your data is protected with industry-standard security practices.
              Access your tickets anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Bottom call-to-action section */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
            Ready to Get Started?
          </h2>
          <button 
            onClick={handleGetStarted}
            className="btn btn-primary"
            style={{ fontSize: '1.125rem', padding: '14px 40px' }}
          >
            Create Your Account Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage
