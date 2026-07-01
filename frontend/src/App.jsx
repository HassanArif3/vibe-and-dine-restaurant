import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import AiCallAgent from './pages/AiCallAgent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ai-agent" element={<AiCallAgent />} />
      </Routes>
      <Footer />
      
      <a 
        href="https://wa.me/923170172333" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-btn"
        title="Order on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.755.002-2.607-1.013-5.059-2.859-6.907C16.628 2.097 14.181 1.08 11.579 1.08 6.142 1.08 1.72 5.449 1.718 10.835c-.001 1.702.463 3.364 1.34 4.801l-.999 3.648 3.795-.989zm11.597-7.467c-.328-.164-1.94-.959-2.241-1.07-.301-.11-.52-.164-.74.164-.22.329-.852 1.07-1.042 1.29-.19.219-.38.246-.708.082-.328-.164-1.386-.511-2.64-1.631-.975-.87-1.633-1.944-1.825-2.272-.19-.329-.02-.507.144-.671.148-.147.328-.384.493-.575.164-.19.22-.328.328-.548.11-.219.055-.411-.027-.575-.082-.164-.74-1.78-.1.14-.15-.316-.273-.414-.492-.12-.22-.11-.462-.055-.548.082-.082.328-.328.492-.492.164-.164.22-.274.328-.438.11-.164.055-.315-.027-.479-.082-.164-.74-1.78-.985-2.383-.238-.574-.479-.496-.656-.505-.17-.008-.364-.01-.559-.01-.195 0-.511.073-.779.364-.268.292-1.022.999-1.022 2.435 0 1.437 1.045 2.822 1.191 3.014.146.191 2.055 3.137 4.978 4.398.695.3 1.238.479 1.662.613.698.222 1.334.191 1.838.116.56-.083 1.94-.794 2.213-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.63-.383z"/>
        </svg>
      </a>
    </Router>
  );
}

export default App;
