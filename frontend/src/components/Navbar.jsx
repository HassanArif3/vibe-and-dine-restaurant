import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const isHomePage = location.pathname === '/';
  const showScrolledNavbar = isScrolled || !isHomePage;

  return (
    <nav className={`navbar ${showScrolledNavbar ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="38" height="38" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#B71C1C"/>
            <circle cx="24" cy="24" r="20" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
            <path d="M17 13v10c0 3.5 2.5 6 6 6" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M31 13v10c0 3.5-2.5 6-6 6" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M17 35V25M31 35V25" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              color: showScrolledNavbar ? 'var(--text)' : '#fff',
              letterSpacing: '0.5px',
              lineHeight: 1.1
            }}>VIBE &amp; DINE</div>
            <div style={{
              fontSize: '0.6rem',
              color: showScrolledNavbar ? 'var(--text-light)' : 'rgba(255,255,255,0.6)',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>RESTAURANT &amp; GRILL</div>
          </div>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''} onClick={closeMenu}>Menu</Link>
          <Link to="/reservation" className={location.pathname === '/reservation' ? 'active' : ''} onClick={closeMenu}>Reservations</Link>
          <Link to="/ai-agent" className={location.pathname === '/ai-agent' ? 'active' : ''} onClick={closeMenu}>AI Ordering</Link>
          <a href="/#gallery" className={location.hash === '#gallery' ? 'active' : ''} onClick={closeMenu}>Gallery</a>
          <a href="/#contact" className={location.hash === '#contact' ? 'active' : ''} onClick={closeMenu}>Contact</a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
