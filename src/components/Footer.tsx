import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Juguetería Cósmica</h3>
          <p className="footer__text">
            Los mejores juguetes para todas las edades. 
            Calidad garantizada y envíos a todo el país.
          </p>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Contacto</h3>
          <ul className="footer__list">
            <li>📧 info@jugueteriacosmica.com</li>
            <li>📞 +54 11 1234-5678</li>
            <li>📍 Av. Siempre Viva 123, CABA</li>
          </ul>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Síguenos</h3>
          <div className="footer__social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">Twitter</a>
          </div>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Información</h3>
          <ul className="footer__list">
            <li><button className="footer__link" onClick={() => console.log('Términos y Condiciones')}>Términos y Condiciones</button></li>
            <li><button className="footer__link" onClick={() => console.log('Política de Privacidad')}>Política de Privacidad</button></li>
            <li><button className="footer__link" onClick={() => console.log('Envíos y Devoluciones')}>Envíos y Devoluciones</button></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2025 Juguetería Cósmica. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
