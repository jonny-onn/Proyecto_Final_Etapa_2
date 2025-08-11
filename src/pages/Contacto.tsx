import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { ContactFormData } from '../types';

const Contacto: React.FC = () => {
  const { errors, validateField, validateForm, clearFieldError } = useFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    email: '',
    comentarios: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const error = validateField(name, value);
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
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
      setFormData({
        nombre: '',
        email: '',
        comentarios: '',
      });
    } catch (error) {
      setSubmitMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contacto">
      <div className="container">
        <div className="contacto__content">
          <div className="contacto__info">
            <h1 className="contacto__title">Contáctanos</h1>
            <p className="contacto__subtitle">
              ¿Tienes alguna pregunta o comentario? Nos encantaría escucharte.
            </p>

            <div className="contacto__details">
              <div className="contacto__detail">
                <h3>📧 Email</h3>
                <p>info@jugueteriacosmica.com</p>
              </div>

              <div className="contacto__detail">
                <h3>📞 Teléfono</h3>
                <p>+54 11 1234-5678</p>
              </div>

              <div className="contacto__detail">
                <h3>📍 Dirección</h3>
                <p>Av. Siempre Viva 123<br />Ciudad Autónoma de Buenos Aires</p>
              </div>

              <div className="contacto__detail">
                <h3>🕒 Horarios de atención</h3>
                <p>
                  Lunes a Viernes: 9:00 - 18:00<br />
                  Sábados: 9:00 - 14:00<br />
                  Domingos: Cerrado
                </p>
              </div>
            </div>
          </div>

          <div className="contacto__form-container">
            <h2>Envíanos un mensaje</h2>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__group">
                <label htmlFor="nombre" className="form__label">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form__input ${errors.nombre ? 'form__input--error' : ''}`}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && <span className="form__error">{errors.nombre}</span>}
                <small className="form__help">Mínimo 3 caracteres, solo letras y espacios.</small>
              </div>

              <div className="form__group">
                <label htmlFor="email" className="form__label">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form__input ${errors.email ? 'form__input--error' : ''}`}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="form__error">{errors.email}</span>}
                <small className="form__help">Ingresa un email válido.</small>
              </div>

              <div className="form__group">
                <label htmlFor="comentarios" className="form__label">
                  Comentarios *
                </label>
                <textarea
                  id="comentarios"
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form__textarea ${errors.comentarios ? 'form__input--error' : ''}`}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={6}
                />
                {errors.comentarios && <span className="form__error">{errors.comentarios}</span>}
                <small className="form__help">Entre 10 y 500 caracteres.</small>
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
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
