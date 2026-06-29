import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, clearCart, user } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cart,
        totalAmount: total,
        deliveryAddress: address,
        phone,
        user: user ? user.id : null
      };
      await axios.post('http://localhost:5000/api/orders', orderData);
      setStatus('Order placed successfully!');
      clearCart();
    } catch (err) {
      setStatus('Failed to place order. Please try again.');
    }
  };

  const deliveryCharges = total > 0 ? 150 : 0;
  const grandTotal = total + deliveryCharges;

  return (
    <>
      <div className="header-spacer"></div>
      <section className="section cart-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="subtitle">Order</span>
            <h2 className="title">Your Cart</h2>
          </div>
          
          {cart.length === 0 && !status ? (
            <div className="empty-cart">
              <ShoppingBag size={64} />
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet.</p>
              <Link to="/menu" className="btn btn-primary">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {status && (
                <div className="order-status">{status}</div>
              )}
              
              {cart.length > 0 && (
                <>
                  <div className="cart-items-card">
                    <div className="cart-items-header">
                      <h3>Cart Items ({cart.length})</h3>
                      <button onClick={clearCart} className="clear-cart-btn">Clear All</button>
                    </div>
                    {cart.map(item => (
                      <div key={item._id} className="cart-item">
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <span className="cart-item-meta">Rs. {item.price.toLocaleString()} x {item.quantity}</span>
                        </div>
                        <div className="cart-item-total">
                          <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                          <button onClick={() => removeFromCart(item._id)} className="remove-btn" aria-label="Remove item">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="cart-total-bar">
                      <span>Subtotal</span>
                      <span>Rs. {total.toLocaleString()}</span>
                    </div>
                    <div className="cart-total-bar">
                      <span>Delivery Charges</span>
                      <span>Rs. {deliveryCharges}</span>
                    </div>
                    <div className="cart-grand-total">
                      <span>Total</span>
                      <span>Rs. {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="checkout-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Delivery Details</h3>
                    <form onSubmit={handleCheckout}>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-control" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03XX XXXXXXX" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Delivery Address</label>
                        <textarea className="form-control" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your full delivery address" rows={3}></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                        Place Order — Rs. {grandTotal.toLocaleString()}
                      </button>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.8rem' }}>
                        Cash on Delivery
                      </p>
                    </form>
                  </div>
                </>
              )}
            </div>
          )}

          {cart.length > 0 && (
            <div className="text-center" style={{ marginTop: '2rem' }}>
              <Link to="/menu" style={{ color: 'var(--primary-color)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
