import React from 'react';

const Nosotros: React.FC = () => {
  return (
    <div className="nosotros">
      <div className="container">
        <section className="nosotros__hero">
          <h1 className="nosotros__title">Sobre Nosotros</h1>
          <p className="nosotros__subtitle">
            Descubre la historia detrás de Juguetería Cósmica
          </p>
        </section>

        <section className="nosotros__content">
          <div className="nosotros__section">
            <h2>Nuestra Historia</h2>
            <p>
              Juguetería Cósmica nació en 2015 con el sueño de llevar alegría y diversión 
              a las familias argentinas. Lo que comenzó como una pequeña tienda local se 
              ha convertido en una de las jugueterías más queridas del país.
            </p>
            <p>
              Fundada por María y Carlos González, dos padres apasionados por la educación 
              y el desarrollo infantil, nuestra tienda se basa en la creencia de que el 
              juego es fundamental para el crecimiento y aprendizaje de los niños.
            </p>
          </div>

          <div className="nosotros__section">
            <h2>Nuestra Misión</h2>
            <p>
              Proporcionar juguetes de alta calidad que estimulen la creatividad, 
              la imaginación y el desarrollo integral de los niños, mientras creamos 
              momentos inolvidables en familia.
            </p>
          </div>

          <div className="nosotros__section">
            <h2>Nuestra Visión</h2>
            <p>
              Ser la juguetería de referencia en Argentina, reconocida por la calidad 
              de nuestros productos, la excelencia en el servicio al cliente y nuestro 
              compromiso con el desarrollo infantil.
            </p>
          </div>

          <div className="nosotros__values">
            <h2>Nuestros Valores</h2>
            <div className="values__grid">
              <div className="value__card">
                <h3>🎯 Calidad</h3>
                <p>
                  Seleccionamos cuidadosamente cada producto para garantizar 
                  la máxima calidad y seguridad.
                </p>
              </div>

              <div className="value__card">
                <h3>👶 Desarrollo Infantil</h3>
                <p>
                  Priorizamos juguetes que contribuyan al desarrollo cognitivo, 
                  motor y social de los niños.
                </p>
              </div>

              <div className="value__card">
                <h3>👨‍👩‍👧‍👦 Familia</h3>
                <p>
                  Creemos en la importancia del tiempo en familia y ofrecemos 
                  productos que fomenten la unión.
                </p>
              </div>

              <div className="value__card">
                <h3>🌱 Sustentabilidad</h3>
                <p>
                  Trabajamos con marcas comprometidas con el medio ambiente 
                  y prácticas sostenibles.
                </p>
              </div>

              <div className="value__card">
                <h3>😊 Servicio al Cliente</h3>
                <p>
                  Nuestro equipo está capacitado para brindar asesoramiento 
                  personalizado y un servicio excepcional.
                </p>
              </div>

              <div className="value__card">
                <h3>🚀 Innovación</h3>
                <p>
                  Constantemente buscamos las últimas tendencias y tecnologías 
                  en el mundo del juguete.
                </p>
              </div>
            </div>
          </div>

          <div className="nosotros__team">
            <h2>Nuestro Equipo</h2>
            <p>
              Contamos con un equipo de especialistas en desarrollo infantil, 
              educadores y padres que entienden las necesidades de cada etapa 
              del crecimiento. Nuestro personal está constantemente capacitado 
              para ofrecer el mejor asesoramiento.
            </p>
            
            <div className="team__stats">
              <div className="stat">
                <h3>15,000+</h3>
                <p>Familias satisfechas</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Productos diferentes</p>
              </div>
              <div className="stat">
                <h3>8</h3>
                <p>Años de experiencia</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Productos seguros</p>
              </div>
            </div>
          </div>

          <div className="nosotros__commitment">
            <h2>Nuestro Compromiso</h2>
            <ul>
              <li>✅ Productos 100% seguros y certificados</li>
              <li>✅ Garantía de calidad en todos nuestros juguetes</li>
              <li>✅ Envíos seguros y rápidos a todo el país</li>
              <li>✅ Asesoramiento personalizado para cada compra</li>
              <li>✅ Precios justos y promociones constantes</li>
              <li>✅ Atención post-venta excepcional</li>
            </ul>
          </div>

          <div className="nosotros__cta">
            <h2>¿Listo para explorar nuestro universo de juguetes?</h2>
            <p>
              Te invitamos a descubrir nuestra amplia selección de productos 
              y a formar parte de la familia Juguetería Cósmica.
            </p>
            <div className="cta__buttons">
              <a href="/" className="btn btn--primary">Ver Productos</a>
              <a href="/contacto" className="btn btn--secondary">Contáctanos</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Nosotros;
