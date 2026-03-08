import { Link } from "react-router-dom";

function Navbar() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.9rem',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    padding: '8px 15px',
    borderRadius: '20px'
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '30px', 
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'auto', // Width adjusts to the content
      padding: '10px 40px',
      background: 'rgba(15, 23, 42, 0.6)', // Slightly darker slate for better contrast
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', // Compatibility for Safari
      borderRadius: '50px',
      display: 'flex',
      gap: '40px', // Space between your three links
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
    }}>
      <Link 
        to="/about" 
        style={linkStyle} 
        onMouseOver={(e) => {
          e.target.style.color = '#60a5fa';
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
        }} 
        onMouseOut={(e) => {
          e.target.style.color = 'white';
          e.target.style.background = 'transparent';
        }}
      >
        About Me
      </Link>

      <Link 
        to="/project" 
        style={linkStyle} 
        onMouseOver={(e) => {
          e.target.style.color = '#60a5fa';
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
        }} 
        onMouseOut={(e) => {
          e.target.style.color = 'white';
          e.target.style.background = 'transparent';
        }}
      >
        Project Info
      </Link>

      <Link 
        to="/practice" 
        style={linkStyle} 
        onMouseOver={(e) => {
          e.target.style.color = '#60a5fa';
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
        }} 
        onMouseOut={(e) => {
          e.target.style.color = 'white';
          e.target.style.background = 'transparent';
        }}
      >
        Practice Lab
      </Link>
    </nav>
  );
}

export default Navbar;