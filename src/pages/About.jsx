// About.jsx - Página sobre nosotros
function About() {
  const teamMembers = [
    { name: 'Carlos Rodríguez', role: 'CEO & Fundador', emoji: '👨‍💼' },
    { name: 'María González', role: 'Directora de Ventas', emoji: '👩‍💼' },
    { name: 'Pedro Martínez', role: 'Jefe de Logística', emoji: '👨‍🔧' },
    { name: 'Ana López', role: 'Atención al Cliente', emoji: '👩‍💻' }
  ];

  const values = [
    { icon: '✓', title: 'Calidad', description: 'Solo trabajamos con las mejores marcas del mercado' },
    { icon: '✓', title: 'Confianza', description: 'Miles de clientes satisfechos nos respaldan' },
    { icon: '✓', title: 'Experiencia', description: 'Más de 10 años en el rubro del ciclismo' },
    { icon: '✓', title: 'Pasión', description: 'Somos ciclistas, entendemos tus necesidades' }
  ];

  const milestones = [
    { year: '2013', event: 'Fundación de MTB Shop' },
    { year: '2015', event: 'Apertura de tienda física' },
    { year: '2018', event: 'Lanzamiento de tienda online' },
    { year: '2020', event: 'Más de 5000 clientes atendidos' },
    { year: '2023', event: 'Expansión a nivel nacional' }
  ];

  return (
    <div className="container mt-4 mb-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold mb-3">Sobre Nosotros 🚴</h1>
          <p className="lead text-muted">
            Tu tienda especializada en componentes para Mountain Bike
          </p>
        </div>
      </div>

      {/* Historia */}
      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">📖 Nuestra Historia</h3>
              <p>
                MTB Shop nació en 2013 de la pasión de un grupo de ciclistas que buscaban 
                ofrecer productos de calidad para la comunidad del ciclismo de montaña en Chile.
              </p>
              <p>
                Lo que comenzó como un pequeño taller en Santiago, hoy es una de las tiendas 
                más reconocidas del país, atendiendo a miles de ciclistas de todo Chile.
              </p>
              <p className="mb-0">
                Nos especializamos en componentes de alta gama para MTB, trabajando directamente 
                con las mejores marcas internacionales para ofrecerte los mejores precios y 
                la mejor calidad.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">🎯 Nuestra Misión</h3>
              <p>
                <strong>Misión:</strong> Proporcionar a la comunidad ciclista chilena acceso 
                a componentes de calidad mundial, con asesoría experta y un servicio al cliente 
                excepcional.
              </p>
              <hr />
              <p>
                <strong>Visión:</strong> Ser la tienda de componentes MTB más confiable y 
                reconocida de Latinoamérica, promoviendo el ciclismo de montaña como estilo 
                de vida.
              </p>
              <hr />
              <p className="mb-0">
                <strong>Valores:</strong> Calidad, Confianza, Experiencia y Pasión por el ciclismo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="text-center mb-4">💎 Nuestros Valores</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {values.map((value, index) => (
              <div key={index} className="col">
                <div className="card h-100 text-center shadow-sm">
                  <div className="card-body">
                    <div className="fs-1 text-success mb-3">{value.icon}</div>
                    <h5 className="card-title">{value.title}</h5>
                    <p className="card-text text-muted">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="text-center mb-4">📅 Nuestra Trayectoria</h3>
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="timeline">
                {milestones.map((milestone, index) => (
                  <div key={index} className="mb-4 d-flex align-items-start">
                    <div className="me-3">
                      <span className="badge bg-success fs-6">{milestone.year}</span>
                    </div>
                    <div>
                      <h6 className="mb-1">{milestone.event}</h6>
                      {index < milestones.length - 1 && (
                        <div className="border-start border-success border-2" style={{ height: '30px', marginLeft: '12px' }}></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipo */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="text-center mb-4">👥 Nuestro Equipo</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col">
                <div className="card h-100 text-center shadow-sm">
                  <div className="card-body">
                    <div 
                      className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center text-white mb-3"
                      style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}
                    >
                      {member.emoji}
                    </div>
                    <h5 className="card-title">{member.name}</h5>
                    <p className="card-text text-muted">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-success text-white shadow-sm">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">📊 MTB Shop en Números</h3>
              <div className="row text-center">
                <div className="col-md-3 mb-3 mb-md-0">
                  <div className="display-4 fw-bold">10+</div>
                  <div className="fs-5">Años de Experiencia</div>
                </div>
                <div className="col-md-3 mb-3 mb-md-0">
                  <div className="display-4 fw-bold">5000+</div>
                  <div className="fs-5">Clientes Satisfechos</div>
                </div>
                <div className="col-md-3 mb-3 mb-md-0">
                  <div className="display-4 fw-bold">500+</div>
                  <div className="fs-5">Productos en Stock</div>
                </div>
                <div className="col-md-3">
                  <div className="display-4 fw-bold">4.9★</div>
                  <div className="fs-5">Calificación Promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Por qué elegirnos */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="text-center mb-4">🏆 ¿Por Qué Elegirnos?</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="fs-1 mb-3">🚚</div>
                  <h5>Envío Rápido</h5>
                  <p className="text-muted mb-0">
                    Despacho en 24-48 horas a todo Chile
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="fs-1 mb-3">💯</div>
                  <h5>Garantía Total</h5>
                  <p className="text-muted mb-0">
                    2 años de garantía en todos nuestros productos
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="fs-1 mb-3">👨‍🔧</div>
                  <h5>Asesoría Experta</h5>
                  <p className="text-muted mb-0">
                    Equipo de ciclistas profesionales a tu servicio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="text-center mb-4">💬 Lo Que Dicen Nuestros Clientes</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="text-warning mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="card-text">
                    "Excelente servicio y productos de calidad. Recomendado 100%"
                  </p>
                  <footer className="blockquote-footer">
                    <small>Juan P., Santiago</small>
                  </footer>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="text-warning mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="card-text">
                    "Los mejores precios del mercado y atención personalizada"
                  </p>
                  <footer className="blockquote-footer">
                    <small>María G., Valparaíso</small>
                  </footer>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="text-warning mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="card-text">
                    "Envío rápido y productos originales. Mi tienda favorita"
                  </p>
                  <footer className="blockquote-footer">
                    <small>Pedro M., Concepción</small>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="row">
        <div className="col-12">
          <div className="card bg-light text-center shadow-sm">
            <div className="card-body p-5">
              <h3 className="mb-3">¿Listo para mejorar tu MTB?</h3>
              <p className="text-muted mb-4">
                Explora nuestro catálogo y encuentra los componentes perfectos para tu bicicleta
              </p>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <a href="/productos" className="btn btn-success btn-lg">
                  Ver Productos
                </a>
                <a href="/contacto" className="btn btn-outline-success btn-lg">
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;