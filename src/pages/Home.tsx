import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Debug: mostrar las URLs de las imágenes en la consola
  useEffect(() => {
    if (products.length > 0) {
      console.log('URLs de imágenes encontradas:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.nombre}: ${product.foto}`);
      });
    }
  }, [products]);
  
  // Obtener parámetros de la URL
  const urlSearchTerm = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlSort = searchParams.get('sort') || '';
  
  // Actualizar el término local cuando cambie la URL
  useEffect(() => {
    setLocalSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  // Obtener categorías únicas con conteo de productos
  const categoriesWithCount = useMemo(() => {
    const categoryCount = products.reduce((acc, product) => {
      acc[product.categoria] = (acc[product.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }, [products]);

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filtrar por categoría
    if (urlCategory) {
      filtered = filtered.filter(product => 
        product.categoria.toLowerCase() === urlCategory.toLowerCase()
      );
    }
    
    // Filtrar por término de búsqueda
    if (localSearchTerm.trim()) {
      const searchLower = localSearchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(searchLower) ||
        product.descripcionCorta.toLowerCase().includes(searchLower) ||
        product.descripcionLarga.toLowerCase().includes(searchLower) ||
        product.categoria.toLowerCase().includes(searchLower) ||
        product.marca.toLowerCase().includes(searchLower)
      );
    }
    
    // Ordenar productos
    if (urlSort) {
      switch (urlSort) {
        case 'name-asc':
          filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;
        case 'price-asc':
          filtered.sort((a, b) => a.precio - b.precio);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.precio - a.precio);
          break;
        case 'category':
          filtered.sort((a, b) => a.categoria.localeCompare(b.categoria));
          break;
        default:
          // Orden por defecto (sin cambios)
          break;
      }
    }
    
    return filtered;
  }, [products, localSearchTerm, urlCategory, urlSort]);

  // Función para limpiar filtros
  const clearFilters = () => {
    setLocalSearchTerm('');
    navigate('/');
  };

  // Función para cambiar categoría
  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    
    setSearchParams(newParams);
  };

  // Función para cambiar ordenamiento
  const handleSortChange = (sortOption: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (sortOption) {
      newParams.set('sort', sortOption);
    } else {
      newParams.delete('sort');
    }
    
    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <div className="home">
        <div className="container">
          <div className="loading">
            <h2>Cargando productos...</h2>
            <div className="loading__spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="container">
          <div className="error">
            <h2>Error al cargar productos</h2>
            <p>{error}</p>
            <button 
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1 className="hero__title">Bienvenidos a Juguetería Cósmica</h1>
          <p className="hero__subtitle">
            Descubre un universo de diversión con nuestros increíbles juguetes
          </p>
        </section>

        {/* Filtros */}
        <section className="filters">
          <div className="filters__row">
            <div className="filters__category">
              <h3 className="filters__title">Filtrar por Categoría</h3>
              <div className="filters__buttons">
                <button
                  className={`filters__btn ${!urlCategory ? 'filters__btn--active' : ''}`}
                  onClick={() => handleCategoryChange('')}
                >
                  Todas las categorías
                  <span className="filters__btn-count">({products.length})</span>
                </button>
                {categoriesWithCount.map(({ category, count }) => (
                  <button
                    key={category}
                    className={`filters__btn ${urlCategory === category ? 'filters__btn--active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                    <span className="filters__btn-count">({count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filters__sort">
              <h3 className="filters__title">Ordenar por</h3>
              <select 
                className="filters__select"
                value={urlSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Orden predeterminado</option>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
                <option value="price-asc">Precio (menor a mayor)</option>
                <option value="price-desc">Precio (mayor a menor)</option>
                <option value="category">Por categoría</option>
              </select>
            </div>
          </div>
          
          {/* Mostrar filtros activos */}
          {(urlCategory || localSearchTerm) && (
            <div className="filters__active">
              <h4 className="filters__active-title">Filtros activos:</h4>
              <div className="filters__active-list">
                {urlCategory && (
                  <span className="filters__active-tag">
                    Categoría: {urlCategory}
                    <button 
                      className="filters__active-remove"
                      onClick={() => handleCategoryChange('')}
                      aria-label={`Quitar filtro de categoría ${urlCategory}`}
                    >
                      ×
                    </button>
                  </span>
                )}
                {localSearchTerm && (
                  <span className="filters__active-tag">
                    Búsqueda: "{localSearchTerm}"
                    <button 
                      className="filters__active-remove"
                      onClick={() => {
                        setLocalSearchTerm('');
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete('search');
                        setSearchParams(newParams);
                      }}
                      aria-label={`Quitar búsqueda ${localSearchTerm}`}
                    >
                      ×
                    </button>
                  </span>
                )}
                <button 
                  className="btn btn--link filters__clear-all"
                  onClick={clearFilters}
                >
                  Limpiar todos los filtros
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="products">
          {localSearchTerm || urlCategory ? (
            <div className="search-results">
              <h2 className="products__title">
                {localSearchTerm && urlCategory ? (
                  <>Resultados para "{localSearchTerm}" en {urlCategory}</>
                ) : localSearchTerm ? (
                  <>Resultados de búsqueda para "{localSearchTerm}"</>
                ) : urlCategory ? (
                  <>Productos de {urlCategory}</>
                ) : (
                  'Productos filtrados'
                )}
              </h2>
              <p className="search-results__count">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                {urlCategory && ` en la categoría "${urlCategory}"`}
              </p>
            </div>
          ) : (
            <h2 className="products__title">Nuestros Productos</h2>
          )}
          
          {filteredProducts.length === 0 ? (
            <div className="products__empty">
              {localSearchTerm || urlCategory ? (
                <div>
                  <p>
                    No se encontraron productos que coincidan con los filtros seleccionados.
                    {localSearchTerm && ` Búsqueda: "${localSearchTerm}"`}
                    {urlCategory && ` Categoría: "${urlCategory}"`}
                  </p>
                  <button 
                    className="btn btn--primary"
                    onClick={clearFilters}
                  >
                    Ver todos los productos
                  </button>
                </div>
              ) : (
                <p>No hay productos disponibles en este momento.</p>
              )}
            </div>
          ) : (
            <div className="products__grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
