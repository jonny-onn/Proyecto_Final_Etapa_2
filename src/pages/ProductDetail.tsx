import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Producto no encontrado, redirigir a home
        navigate('/');
      }
    }
  }, [id, products, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const handleImageError = () => {
    console.error(`Error al cargar imagen: ${product?.foto}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`Imagen cargada correctamente: ${product?.foto}`);
    setImageError(false);
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="loading">
            <h2>Cargando producto...</h2>
            <div className="loading__spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="error">
            <h2>Producto no encontrado</h2>
            <p>El producto que buscas no existe o ha sido eliminado.</p>
            <Link to="/" className="btn btn--primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb__link">Inicio</Link>
          <span className="breadcrumb__separator">›</span>
          <Link to={`/?category=${encodeURIComponent(product.categoria)}`} className="breadcrumb__link">
            {product.categoria}
          </Link>
          <span className="breadcrumb__separator">›</span>
          <span className="breadcrumb__current">{product.nombre}</span>
        </nav>

        <div className="product-detail__content">
          {/* Galería de imágenes */}
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              {imageError ? (
                <div className="product-detail__image-placeholder">
                  <span>📷</span>
                  <p>Imagen no disponible</p>
                  <small>{product.nombre}</small>
                </div>
              ) : (
                <img 
                  src={product.foto} 
                  alt={product.nombre}
                  className="product-detail__image"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              )}
              {product.envioSinCargo && (
                <span className="product-detail__badge">Envío Gratis</span>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="product-detail__info">
            <div className="product-detail__header">
              <h1 className="product-detail__title">{product.nombre}</h1>
              <p className="product-detail__brand">Marca: {product.marca}</p>
              <div className="product-detail__category-age">
                <span className="product-detail__category">{product.categoria}</span>
                <span className="product-detail__age">
                  Edad recomendada: {product.edadDesde} - {product.edadHasta} años
                </span>
              </div>
            </div>

            <div className="product-detail__description">
              <h3>Descripción</h3>
              <p className="product-detail__description-short">{product.descripcionCorta}</p>
              {product.descripcionLarga && (
                <div className="product-detail__description-long">
                  <h4>Detalles completos</h4>
                  <p>{product.descripcionLarga}</p>
                </div>
              )}
            </div>

            <div className="product-detail__specs">
              <h3>Información adicional</h3>
              <dl className="product-detail__specs-list">
                <dt>Envío sin cargo</dt>
                <dd>{product.envioSinCargo ? 'Sí' : 'No'}</dd>
                <dt>Stock disponible</dt>
                <dd>{product.stock > 0 ? `${product.stock} unidades` : 'Sin stock'}</dd>
              </dl>
            </div>

            {/* Precio y compra */}
            <div className="product-detail__purchase">
              <div className="product-detail__price">
                <span className="product-detail__price-value">${product.precio}</span>
                <span className="product-detail__stock">
                  {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
                </span>
              </div>

              <div className="product-detail__actions">
                <button 
                  className="btn btn--primary btn--large"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <span className="btn__icon">🛒</span>
                  {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                </button>
                <button 
                  className="btn btn--secondary btn--large"
                  onClick={() => navigate(-1)}
                >
                  ← Volver
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="product-detail__related">
          <h3>Productos relacionados</h3>
          <div className="product-detail__related-grid">
            {products
              .filter(p => p.categoria === product.categoria && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link 
                  key={relatedProduct.id}
                  to={`/producto/${relatedProduct.id}`}
                  className="product-detail__related-item"
                >
                  <img 
                    src={relatedProduct.foto} 
                    alt={relatedProduct.nombre}
                    className="product-detail__related-image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const placeholder = document.createElement('div');
                      placeholder.className = 'product-detail__related-placeholder';
                      placeholder.innerHTML = '📷<br>Sin imagen';
                      e.currentTarget.parentNode?.appendChild(placeholder);
                    }}
                  />
                  <h4 className="product-detail__related-title">{relatedProduct.nombre}</h4>
                  <p className="product-detail__related-price">${relatedProduct.precio}</p>
                </Link>
              ))
            }
          </div>
        </div>

        {/* Mensaje de confirmación */}
        {showMessage && (
          <div className="product-detail__message">
            <div className="product-detail__message-content">
              ✅ ¡Producto agregado al carrito exitosamente!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
