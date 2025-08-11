import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import Home from './pages/Home';
import Alta from './pages/Alta';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/alta" element={<Alta />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
              </Routes>
            </main>
            <Footer />
            <CartModal />
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
