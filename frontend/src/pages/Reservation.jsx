import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Phone, User, MessageSquare } from 'lucide-react';
import FloorPlanSelector from '../components/reservation/FloorPlanSelector';

const Reservation = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTable) {
      alert('Please select a dining table from the visual layout floor plan.');
      return;
    }
    try {
      console.log('Reservation Data:', { ...formData, tableId: selectedTable });
      showNotification(`Table ${selectedTable} reserved successfully! We look forward to hosting you at Vibe & Dine.`);
      setFormData({
        name: '', phone: '', date: '', time: '', guests: 2, specialRequests: ''
      });
      setSelectedTable(null);
    } catch (err) {
      console.error(err);
      showNotification('Failed to make reservation. Please try again.');
    }
  };

  return (
    <>
      <div className="header-spacer"></div>
      
      <div className={`toast ${notification.show ? 'show' : ''}`}>
        <span>{notification.message}</span>
      </div>

      <section className="section reservation-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="subtitle">Book a Table</span>
            <h2 className="title">Make a Reservation</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
              Secure your spot at Vibe & Dine and prepare for an unforgettable dining experience.
            </p>
          </div>

          <motion.div 
            className="reservation-form-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit}>
              <FloorPlanSelector selectedTable={selectedTable} onSelectTable={setSelectedTable} />
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label"><User size={14} /> Full Name</label>
                  <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label"><Phone size={14} /> Phone Number</label>
                  <input type="tel" name="phone" className="form-control" required value={formData.phone} onChange={handleChange} placeholder="0300 1234567" />
                </div>
                <div className="form-group">
                  <label className="form-label"><Calendar size={14} /> Date</label>
                  <input type="date" name="date" className="form-control" required value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label"><Clock size={14} /> Time</label>
                  <input type="time" name="time" className="form-control" required value={formData.time} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label"><Users size={14} /> Number of Guests</label>
                  <input type="number" name="guests" className="form-control" min="1" max="20" required value={formData.guests} onChange={handleChange} />
                </div>
                <div className="form-group full-width">
                  <label className="form-label"><MessageSquare size={14} /> Special Requests (Optional)</label>
                  <textarea name="specialRequests" className="form-control" value={formData.specialRequests} onChange={handleChange} placeholder="Any dietary requirements or special occasions?"></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary form-submit btn-lg">
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Reservation;
