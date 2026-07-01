import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Coffee, Users, Star, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Frontend-only submission simulation
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        message: ''
      });
    }, 4000);
  };

  const popularItems = [
    { name: 'Smash Burger', desc: 'Hand-pressed double beef patties, melted cheese, house sauce on toasted brioche.', price: 650, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
    { name: 'Premium Pizza', desc: 'Freshly stretched sourdough, gourmet pepperoni, loaded mozzarella, crown crust.', price: 1200, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80' },
    { name: 'Crispy Fries', desc: 'Golden, double-fried crispy potato batons, lightly tossed in sea salt & spices.', price: 350, img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
    { name: 'Grilled Sandwich', desc: 'Toasted organic sourdough bread layered with smoked turkey breast and melted swiss.', price: 550, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80' },
    { name: 'Cold Drink', desc: 'Chilled carbonated soft drink served over crushed ice and lemon slices.', price: 150, img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80' },
    { name: 'Special Platter', desc: 'A rich combination of flame-grilled tikka boti, seekh kebabs, and garlic naan.', price: 1800, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80' }
  ];

  return (
    <>
      {/* 1. HERO SECTION */}
      <section 
        className="hero animate-[fadeIn_0.5s_ease-out]" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1920")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="hero-overlay" style={{ background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.65))' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-content">
            <motion.span 
              className="hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1.5px solid var(--accent)',
                color: 'var(--accent)',
                padding: '6px 18px',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '1.5rem'
              }}
            >
              Now Open in Gujrat
            </motion.span>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                fontSize: '4.5rem',
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.5rem',
                fontWeight: 700
              }}
            >
              Vibe & Dine:<br />Where Flavors Meet
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                maxWidth: '650px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              Experience Gujrat's premier culinary destination, serving flame-kissed Smash Burgers, 
              fresh hand-rolled Pizzas, and handcrafted sides in an elegant, modern setting.
            </motion.p>
            <motion.div 
              className="hero-btns"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link to="/menu" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '50px' }}>
                Explore Menu <ArrowRight size={18} />
              </Link>
              <a href="#book-table" className="btn btn-outline btn-white" style={{ padding: '14px 32px', borderRadius: '50px' }}>
                Book a Table
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="about-grid">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="subtitle">Our Story</span>
              <h2 className="title" style={{ fontSize: '3rem', fontWeight: 700 }}>A Culinary Journey in Gujrat</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
                At Vibe & Dine, we believe that a great meal is more than just food; it's an experience 
                that brings people together. Newly opened in the heart of Gujrat, our restaurant is 
                designed to be the perfect venue for your memorable moments.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
                We specialize in what we love: juicy, perfectly caramelized Smash Burgers, stunning 
                Crown Crust Pizzas with fresh dough, and a range of delicious sides that keep you 
                coming back for more. Come for the food, stay for the Vibe!
              </p>
              <a href="#book-table" className="btn btn-outline" style={{ borderRadius: '50px' }}>
                Book Your Table <ArrowRight size={16} />
              </a>
            </motion.div>
            <motion.div 
              className="about-img-wrap"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80" 
                alt="Restaurant Interior" 
                className="about-img" 
                style={{ width: '100%', display: 'block', transition: 'var(--transition)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR MENU SECTION */}
      <section className="section" style={{ background: '#FAF8F5', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle">Popular Menu</span>
            <h2 className="title" style={{ fontSize: '3rem', fontWeight: 700 }}>Fresh flavors crafted for every craving</h2>
          </div>

          <div className="menu-grid">
            {popularItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="menu-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ overflow: 'hidden', height: '220px', relative: 'true' }}>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }}
                    className="menu-img-zoom" 
                  />
                </div>
                <div className="menu-content" style={{ padding: '1.8rem' }}>
                  <div className="menu-header" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <h3 className="menu-title" style={{ fontFamily: 'inherit', fontSize: '1.25rem', fontWeight: 700 }}>{item.name}</h3>
                    <span className="menu-price" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.15rem' }}>Rs. {item.price}</span>
                  </div>
                  <p className="menu-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem', minHeight: '45px' }}>{item.desc}</p>
                  <Link to="/menu" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px 0', fontSize: '0.85rem', borderRadius: '50px' }}>
                    Order Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle">Why Choose Us</span>
            <h2 className="title" style={{ fontSize: '3rem', fontWeight: 700 }}>The Vibe & Dine Experience</h2>
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

      {/* 5. STATS SECTION */}
      <section className="section" style={{ background: '#FAF8F5', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="stats-grid">
            <motion.div className="stat-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.05 }} viewport={{ once: true }}>
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </motion.div>
            <motion.div className="stat-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.15 }} viewport={{ once: true }}>
              <div className="stat-number">50+</div>
              <div className="stat-label">Menu Items</div>
            </motion.div>
            <motion.div className="stat-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.25 }} viewport={{ once: true }}>
              <div className="stat-number">4.8</div>
              <div className="stat-label">Customer Rating</div>
            </motion.div>
            <motion.div className="stat-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.35 }} viewport={{ once: true }}>
              <div className="stat-number">7 Days</div>
              <div className="stat-label">Open Weekly</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. AMBIANCE / GALLERY SECTION */}
      <section className="section" id="gallery" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle">Ambiance</span>
            <h2 className="title" style={{ fontSize: '3rem', fontWeight: 700 }}>Experience Elegance</h2>
          </div>
          <div className="gallery-grid">
            <motion.div 
              className="gallery-item gallery-item-tall"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}
            >
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="Vibe & Dine Exterior" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'var(--transition)' }} />
            </motion.div>
            <motion.div 
              className="gallery-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}
            >
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" alt="Vibe & Dine Interior" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'var(--transition)' }} />
            </motion.div>
            <motion.div 
              className="gallery-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}
            >
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80" alt="Vibe & Dine Food" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'var(--transition)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. RESERVATION SECTION */}
      <section className="section" id="book-table" style={{ background: '#FAF8F5', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="subtitle">Book Your Table</span>
            <h2 className="title" style={{ fontSize: '3rem', fontWeight: 700 }}>Reserve your dining experience with Vibe & Dine</h2>
          </div>

          <div className="reservation-form-container">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
                style={{ padding: '3rem 1.5rem' }}
              >
                <div style={{ color: 'var(--primary)', fontSize: '4rem', marginBottom: '1.5rem' }}>✓</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.8rem', color: 'var(--text)' }}>Table Reserved Successfully!</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  Thank you for booking with us. We have locked your table slot and look forward to welcoming you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="Your Name" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="03XX XXXXXXX" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input 
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Number of Guests</label>
                    <select 
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="6">6 Persons</option>
                      <option value="8">8+ Persons</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Message / Special Requests</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="Specify allergies, baby high-chair, window table request, etc." 
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary form-submit" style={{ borderRadius: '50px', padding: '14px 0' }}>
                  Reserve Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle">Testimonials</span>
            <h2 className="title" style={{ fontSize: '3rem', fontWeight: 700 }}>What Our Customers Say</h2>
          </div>
          <div className="testimonials-grid">
            <motion.div className="testimonial-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Great taste and beautiful ambiance. A perfect place for family dinner."</p>
              <div className="testimonial-author">Customer Review</div>
            </motion.div>
            <motion.div className="testimonial-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Fresh food, fast service and a clean environment. Highly recommended."</p>
              <div className="testimonial-author">Customer Review</div>
            </motion.div>
            <motion.div className="testimonial-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"The burgers and pizzas were amazing. The online booking experience was smooth."</p>
              <div className="testimonial-author">Customer Review</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. VISIT US / LOCATION SECTION */}
      <section className="section" id="contact" style={{ background: '#FAF8F5', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle">Visit Us</span>
            <h2 className="title" style={{ fontSize: '3rem', fontWeight: 700 }}>Contact & Directions</h2>
          </div>

          <div className="contact-grid">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text)' }}>Contact Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><MapPin size={18} className="text-primary" /> Gujrat, Punjab</p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Phone size={18} className="text-primary" /> +92 317 0172333</p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Mail size={18} className="text-primary" /> info@vibedine.pk</p>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text)' }}>Opening Hours</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Clock size={18} className="text-primary" /> <strong>Mon - Thu:</strong> 12PM - 11:30PM</p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Clock size={18} className="text-primary" /> <strong>Fri - Sun:</strong> 12PM - 1AM</p>
                </div>
              </div>
            </div>

            <div className="map-container">
              {/* Google Map Mock/Placeholder */}
              <iframe 
                title="Vibe & Dine Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53808.19799298457!2d74.03798436665799!3d32.58586071415254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1a56bc294c79%3A0xe54e60d00f074d08!2sGujrat%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 10. STRONG FINAL CTA SECTION */}
      <section className="container" style={{ paddingBottom: '4rem' }}>
        <motion.div 
          className="final-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="final-cta-content">
            <h2 className="final-cta-title">Ready to Taste Something Special?</h2>
            <p className="final-cta-text">Book your table today and enjoy the premium Vibe & Dine culinary experience.</p>
            <div className="final-cta-btns">
              <a href="#book-table" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '50px' }}>Book a Table</a>
              <Link to="/menu" className="btn btn-outline btn-white" style={{ padding: '14px 32px', borderRadius: '50px' }}>Explore Menu</Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
