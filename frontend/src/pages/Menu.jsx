import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(AppContext);
  const [showToast, setShowToast] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menu', { timeout: 800 });
        setMenuItems(res.data);
      } catch (err) {
        console.log('Backend not available, using fallback data', err);
        setMenuItems([
          { _id: '1', name: 'Beef Smash Burger', description: 'Hand-pressed caramelized beef patties with signature sauce and premium cheese.', price: 750, category: 'Smash Burgers', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
          { _id: '2', name: 'Chicken Smash Burger', description: 'Crispy, juicy hand-pressed chicken patty for chicken lovers.', price: 650, category: 'Smash Burgers', imageUrl: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?w=500&q=80' },
          { _id: '3', name: 'Crown Crust Pizza', description: 'Stunning premium pizza with a cheese-stuffed crust crown on organic whole grain dough.', price: 1500, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80' },
          { _id: '4', name: 'Crispy Spring Rolls', description: 'The ultimate snack attack. Crunchy rolls packed with savory fillings.', price: 350, category: 'Appetizers', imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80' },
          { _id: '5', name: 'Loaded Fries', description: 'Crispy fries generously seasoned and topped with melted cheese and signature sauces.', price: 450, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
          { _id: '6', name: 'Vibe Group Deal', description: 'Value deal for 5 persons including burgers, pizza, and drinks.', price: 1250, category: 'Deals', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="header-spacer"></div>
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="subtitle">Discover</span>
            <h2 className="title">Our Menu</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
              Explore our diverse range of dishes crafted with passion. From gourmet burgers to 
              wood-fired pizzas, every bite is a celebration of flavor.
            </p>
          </div>

          {!loading && (
            <>
              <div className="menu-toolbar">
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search menu items..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="category-filter">
                  {categories.map((category, index) => (
                    <button 
                      key={index} 
                      className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filteredItems.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center" 
                    style={{ padding: '4rem 0', color: 'var(--text-muted)' }}
                  >
                    <p style={{ fontSize: '1.2rem' }}>No items found matching your search.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={activeCategory + searchQuery}
                    className="menu-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredItems.map((item, index) => (
                      <motion.div 
                        key={item._id} 
                        className="menu-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        layout
                      >
                        <div className="menu-img-wrap">
                          <img src={item.imageUrl} alt={item.name} className="menu-img" loading="lazy" />
                          <span className="menu-category">{item.category}</span>
                        </div>
                        <div className="menu-content">
                          <div className="menu-header">
                            <h3 className="menu-title">{item.name}</h3>
                            <span className="menu-price">Rs. {item.price.toLocaleString()}</span>
                          </div>
                          <p className="menu-desc">{item.description}</p>
                          <button 
                            className="btn btn-primary add-to-cart-btn"
                            onClick={() => {
                              addToCart(item);
                              setShowToast(`${item.name} added to cart!`);
                              setTimeout(() => setShowToast(''), 3000);
                            }}
                          >
                            <ShoppingBag size={16} /> Add to Cart
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {loading && (
            <div className="text-center" style={{ padding: '4rem 0' }}>
              <div className="loading-spinner"></div>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Loading our delicious menu...</p>
            </div>
          )}
        </div>
      </section>

      <div className={`toast ${showToast ? 'show' : ''}`}>
        <span>{showToast}</span>
      </div>
    </>
  );
};

export default Menu;
