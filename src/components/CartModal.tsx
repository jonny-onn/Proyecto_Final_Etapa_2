import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CartModal: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    clearCart 
  } = useCart();

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-modal__overlay" onClick={handleOverlayClick}>
      <div className="cart-modal">
        <div className="cart-modal__header">
          <h2>Carrito de Compras</h2>
          <button 
            className="cart-modal__close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        <div className="cart-modal__content">
          {cartItems.length === 0 ? (
            <p className="cart-modal__empty">Tu carrito está vacío</p>
          ) : (
            <>
              <ul className="cart-modal__items">
                {cartItems.map(item => (
                  <li key={item.product.id} className="cart-item">
                    <img 
                      src={item.product.foto} 
                      alt={item.product.nombre}
                      className="cart-item__image"
                    />
                    <div className="cart-item__info">
                      <h3 className="cart-item__name">{item.product.nombre}</h3>
                      <p className="cart-item__price">${item.product.precio}</p>
                    </div>
                    <div className="cart-item__quantity">
                      <button 
                        className="cart-item__qty-btn"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                        className="cart-item__qty-input"
                        min="1"
                      />
                      <button 
                        className="cart-item__qty-btn"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item__subtotal">
                      ${(item.product.precio * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Eliminar producto"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-modal__footer">
                <div className="cart-modal__total">
                  <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                </div>
                <div className="cart-modal__actions">
                  <button 
                    className="btn btn--secondary"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </button>
                  <button className="btn btn--primary">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
