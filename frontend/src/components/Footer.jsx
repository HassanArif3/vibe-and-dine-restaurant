import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="42" height="42" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#B71C1C"/>
                <circle cx="24" cy="24" r="20" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
                <path d="M17 13v10c0 3.5 2.5 6 6 6" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M31 13v10c0 3.5-2.5 6-6 6" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M17 35V25M31 35V25" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.5px',
                  lineHeight: 1.1
                }}>VIBE &amp; DINE</div>
                <div style={{
                  fontSize: '0.6rem',
                  color: '#6B7280',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>RESTAURANT &amp; GRILL</div>
              </div>
            </Link>
            <p className="footer-text">
              Experience the finest culinary journey in Gujrat. We blend traditional flavors with modern elegance.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Youtube">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/reservation">Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-contact">
              <p><MapPin size={14} /> Gujrat, Punjab</p>
              <p><Phone size={14} /> +92 317 0172333</p>
              <p><Mail size={14} /> info@vibedine.pk</p>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Hours</h4>
            <div className="footer-contact">
              <p>Mon - Thu: 12PM - 11:30PM</p>
              <p>Fri - Sun: 12PM - 1AM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vibe & Dine Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
