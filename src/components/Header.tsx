import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { getTotalItems, isCartOpen, setIsCartOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sincronizar el input con la URL
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search') || '';
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // Si no hay término, ir a home sin parámetros
      navigate('/');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            <h1>Juguetería Cósmica</h1>
          </Link>
          
          <form className="header__search" onSubmit={handleSearch}>
            <input 
              type="search" 
              placeholder="Buscar productos..." 
              className="header__search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="header__search-buttons">
              {searchTerm && (
                <button 
                  type="button"
                  className="header__search-clear"
                  onClick={clearSearch}
                  aria-label="Limpiar búsqueda"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <button 
                type="submit"
                className="header__search-btn"
                aria-label="Buscar productos"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>

          <div className="header__cart">
            <button 
              className="header__cart-btn"
              onClick={toggleCart}
              aria-label={`Abrir carrito (${getTotalItems()} productos)`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {getTotalItems() > 0 && (
                <span className="header__cart-count">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Home</Link>
            </li>
            <li className="nav__item">
              <Link to="/alta" className="nav__link">Alta</Link>
            </li>
            <li className="nav__item">
              <Link to="/contacto" className="nav__link">Contacto</Link>
            </li>
            <li className="nav__item">
              <Link to="/nosotros" className="nav__link">Nosotros</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* <CartModal /> */}
    </>
  );
};

export default Header;
