import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useFormValidation } from '../hooks/useFormValidation';
import { ProductFormData } from '../types';

const Alta: React.FC = () => {
  const { addProduct } = useProducts();
  const { errors, validateField, validateForm, clearFieldError } = useFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState<ProductFormData>({
    nombre: '',
    precio: '',
    stock: '',
    marca: '',
    categoria: '',
    descripcionCorta: '',
    descripcionLarga: '',
    envioSinCargo: false,
    edadDesde: '',
    edadHasta: '',
    foto: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    const error = validateField(name, fieldValue);
    if (!error) {
      clearFieldError(name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      setSubmitMessage('Por favor, corrige los errores antes de enviar el formulario.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const productData = {
        nombre: formData.nombre.trim(),
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        marca: formData.marca.trim(),
        categoria: formData.categoria.trim(),
        descripcionCorta: formData.descripcionCorta.trim(),
        descripcionLarga: formData.descripcionLarga.trim(),
        envioSinCargo: formData.envioSinCargo,
        edadDesde: Number(formData.edadDesde),
        edadHasta: Number(formData.edadHasta),
        foto: formData.foto.trim(),
      };

      await addProduct(productData);

      setSubmitMessage('¡Producto agregado exitosamente!');
      setFormData({
        nombre: '',
        precio: '',
        stock: '',
        marca: '',
        categoria: '',
        descripcionCorta: '',
        descripcionLarga: '',
        envioSinCargo: false,
        edadDesde: '',
        edadHasta: '',
        foto: '',
      });
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : 'Error al agregar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="alta">
      <div className="container">
        <h1 className="alta__title">Alta de Producto</h1>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <div className="form__group">
              <label htmlFor="nombre" className="form__label">
                Nombre del Producto *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form__input ${errors.nombre ? 'form__input--error' : ''}`}
                placeholder="Ingresa el nombre del producto"
              />
              {errors.nombre && <span className="form__error">{errors.nombre}</span>}
              <small className="form__help">Mínimo 3 caracteres, máximo 50. Solo letras y espacios.</small>
            </div>

            <div className="form__group">
              <label htmlFor="precio" className="form__label">
                Precio *
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form__input ${errors.precio ? 'form__input--error' : ''}`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.precio && <span className="form__error">{errors.precio}</span>}
              <small className="form__help">Debe ser un número mayor a 0.</small>
            </div>
          </div>

          <div className="form__row">
            <div className="form__group">
              <label htmlFor="stock" className="form__label">
                Stock *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form__input ${errors.stock ? 'form__input--error' : ''}`}
                placeholder="0"
                min="0"
              />
              {errors.stock && <span className="form__error">{errors.stock}</span>}
              <small className="form__help">Cantidad disponible del producto.</small>
            </div>

            <div className="form__group">
              <label htmlFor="marca" className="form__label">
                Marca *
              </label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form__input ${errors.marca ? 'form__input--error' : ''}`}
                placeholder="Marca del producto"
              />
              {errors.marca && <span className="form__error">{errors.marca}</span>}
              <small className="form__help">Mínimo 2 caracteres, máximo 30.</small>
            </div>
          </div>

          <div className="form__row">
            <div className="form__group">
              <label htmlFor="categoria" className="form__label">
                Categoría *
              </label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form__input ${errors.categoria ? 'form__input--error' : ''}`}
                placeholder="Categoría del producto"
              />
              {errors.categoria && <span className="form__error">{errors.categoria}</span>}
              <small className="form__help">Ej: Muñecas, Autos, Construcción, etc.</small>
            </div>

            <div className="form__group form__group--checkbox">
              <label className="form__checkbox">
                <input
                  type="checkbox"
                  name="envioSinCargo"
                  checked={formData.envioSinCargo}
                  onChange={handleInputChange}
                />
                <span className="form__checkbox-mark"></span>
                Envío sin cargo
              </label>
            </div>
          </div>

          <div className="form__row">
            <div className="form__group">
              <label htmlFor="edadDesde" className="form__label">
                Edad desde *
              </label>
              <input
                type="number"
                id="edadDesde"
                name="edadDesde"
                value={formData.edadDesde}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form__input ${errors.edadDesde ? 'form__input--error' : ''}`}
                placeholder="0"
                min="0"
                max="99"
              />
              {errors.edadDesde && <span className="form__error">{errors.edadDesde}</span>}
              <small className="form__help">Edad mínima recomendada.</small>
            </div>

            <div className="form__group">
              <label htmlFor="edadHasta" className="form__label">
                Edad hasta *
              </label>
              <input
                type="number"
                id="edadHasta"
                name="edadHasta"
                value={formData.edadHasta}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form__input ${errors.edadHasta ? 'form__input--error' : ''}`}
                placeholder="99"
                min="0"
                max="99"
              />
              {errors.edadHasta && <span className="form__error">{errors.edadHasta}</span>}
              <small className="form__help">Edad máxima recomendada.</small>
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="descripcionCorta" className="form__label">
              Descripción Corta *
            </label>
            <textarea
              id="descripcionCorta"
              name="descripcionCorta"
              value={formData.descripcionCorta}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form__textarea ${errors.descripcionCorta ? 'form__input--error' : ''}`}
              placeholder="Descripción breve del producto"
              rows={3}
            />
            {errors.descripcionCorta && <span className="form__error">{errors.descripcionCorta}</span>}
            <small className="form__help">Entre 10 y 100 caracteres.</small>
          </div>

          <div className="form__group">
            <label htmlFor="descripcionLarga" className="form__label">
              Descripción Larga *
            </label>
            <textarea
              id="descripcionLarga"
              name="descripcionLarga"
              value={formData.descripcionLarga}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form__textarea ${errors.descripcionLarga ? 'form__input--error' : ''}`}
              placeholder="Descripción detallada del producto"
              rows={5}
            />
            {errors.descripcionLarga && <span className="form__error">{errors.descripcionLarga}</span>}
            <small className="form__help">Entre 20 y 500 caracteres.</small>
          </div>

          <div className="form__group">
            <label htmlFor="foto" className="form__label">
              URL de la Foto *
            </label>
            <input
              type="url"
              id="foto"
              name="foto"
              value={formData.foto}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form__input ${errors.foto ? 'form__input--error' : ''}`}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.foto && <span className="form__error">{errors.foto}</span>}
            <small className="form__help">URL válida de la imagen del producto.</small>
          </div>

          {submitMessage && (
            <div className={`form__message ${submitMessage.includes('exitosamente') ? 'form__message--success' : 'form__message--error'}`}>
              {submitMessage}
            </div>
          )}

          <div className="form__actions">
            <button
              type="submit"
              className="btn btn--primary btn--large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Agregando...' : 'Agregar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Alta;
