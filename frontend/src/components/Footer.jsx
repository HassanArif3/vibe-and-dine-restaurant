import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

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
            <div>
              <a href="#" className="social-link" aria-label="Instagram"><Globe size={16} /></a>
              <a href="#" className="social-link" aria-label="Facebook"><Globe size={16} /></a>
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
