import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Coffee, Users } from 'lucide-react';

const Home = () => {
  return (
    <>
      <section 
        className="hero" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514933651103-005eab06c04d?q=80&w=1920")' }}
      >
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <motion.span 
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Now Open in Gujrat
            </motion.span>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Vibe & Dine:<br />Where Flavors Meet
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Welcome to Vibe & Dine, Gujrat's ultimate destination for the best Smash Burgers, 
              premium Pizzas, and unforgettable moments with friends and family.
            </motion.p>
            <motion.div 
              className="hero-btns"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/menu" className="btn btn-primary btn-lg">
                Explore Menu <ArrowRight size={18} />
              </Link>
              <Link to="/reservation" className="btn btn-outline btn-lg btn-white">Book a Table</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="subtitle">Our Story</span>
              <h2 className="title">A Culinary Journey in Gujrat</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                At Vibe & Dine, we believe that a great meal is more than just food; it's an experience 
                that brings people together. Newly opened in the heart of Gujrat, our restaurant is 
                designed to be the perfect venue for your memorable moments.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
                We specialize in what we love: juicy, perfectly caramelized Smash Burgers, stunning 
                Crown Crust Pizzas with fresh dough, and a range of delicious sides that keep you 
                coming back for more. Come for the food, stay for the Vibe!
              </p>
              <Link to="/reservation" className="btn btn-outline">
                Book Your Table <ArrowRight size={16} style={{ marginLeft: '6px' }} />
              </Link>
            </motion.div>
            <motion.div 
              className="about-img-wrap"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80" 
                alt="Restaurant Interior" 
                className="about-img" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="subtitle">Why Choose Us</span>
            <h2 className="title">The Vibe & Dine Experience</h2>
          </div>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon"><Award size={28} /></div>
              <h3>Premium Quality</h3>
              <p>Fresh ingredients, hand-pressed patties, and organic dough for an unforgettable taste.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon"><Users size={28} /></div>
              <h3>Family Friendly</h3>
              <p>A warm, inviting atmosphere perfect for family dinners, friendly gatherings, and special occasions.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon"><Coffee size={28} /></div>
              <h3>Great Ambiance</h3>
              <p>Elegantly designed interiors with modern decor to create the perfect dining atmosphere.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="subtitle">Ambiance</span>
            <h2 className="title">Experience Elegance</h2>
          </div>
          <div className="gallery-grid">
            <motion.div 
              className="gallery-item gallery-item-tall"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="Vibe & Dine Exterior" />
            </motion.div>
            <motion.div 
              className="gallery-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" alt="Vibe & Dine Interior" />
            </motion.div>
            <motion.div 
              className="gallery-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80" alt="Vibe & Dine Food" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
