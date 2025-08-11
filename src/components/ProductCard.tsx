import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleImageError = () => {
    console.error(`Error al cargar imagen: ${product.foto}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`Imagen cargada correctamente: ${product.foto}`);
    setImageError(false);
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        {imageError ? (
          <div className="product-card__image-placeholder">
            <span>📷</span>
            <p>Imagen no disponible</p>
            <small>{product.nombre}</small>
          </div>
        ) : (
          <img 
            src={product.foto} 
            alt={product.nombre}
            className="product-card__image"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        {product.envioSinCargo && (
          <span className="product-card__badge">Envío Gratis</span>
        )}
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.nombre}</h3>
        <p className="product-card__brand">{product.marca}</p>
        <p className="product-card__description">{product.descripcionCorta}</p>
        
        <div className="product-card__details">
          <span className="product-card__category">{product.categoria}</span>
          <span className="product-card__age">
            {product.edadDesde} - {product.edadHasta} años
          </span>
        </div>

        <div className="product-card__price">
          <span className="product-card__price-value">${product.precio}</span>
          <span className="product-card__stock">
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
          </span>
        </div>

        <div className="product-card__actions">
          <Link 
            to={`/producto/${product.id}`}
            className="btn btn--secondary btn--small"
          >
            Más info
          </Link>
          <button 
            className="btn btn--primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>

      {showMessage && (
        <div className="product-card__message">
          ✅ Producto agregado al carrito
        </div>
      )}
    </div>
  );
};

export default ProductCard;
