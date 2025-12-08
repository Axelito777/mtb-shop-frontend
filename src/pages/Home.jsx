import { useState } from 'react';

function Home() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div>
      {/* Hero Header con título */}
      <div 
        className="position-relative text-center text-white py-5"
        style={{
          minHeight: '200px',
          background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1 
          className="display-3 fw-bold"
          style={{
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            letterSpacing: '2px'
          }}
        >
          MTB COMPONENTS
        </h1>
      </div>

      {/* Main Content */}
      <main className="container py-5">
        
        {/* Tarjetas Expandibles */}
        <section className="mb-5 pb-5">
          <div className="row g-4">
            
            {/* Tarjeta 1: Quiénes Somos */}
            <div className="col-md-4">
              <div 
                className="card h-100 shadow-lg overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '4px solid #ff7f50',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.5s ease'
                }}
                onClick={() => toggleCard(1)}
              >
                <div className="card-body p-4 text-center">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#ff7f50',
                      borderRadius: '50%'
                    }}
                  >
                    <span style={{ fontSize: '32px' }}>👥</span>
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-2">Quiénes Somos</h3>
                  <p className="text-muted">Conoce nuestra historia</p>
                  
                  {expandedCard === 1 && (
                    <div className="mt-3 pt-3 border-top text-start">
                      <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                        MTB Components nace de la pasión por el ciclismo de montaña. Ubicados en Santiago, Chile, somos una tienda especializada con más de 5 años de experiencia en el rubro. Nuestro equipo está formado por ciclistas apasionados que conocen cada componente y su importancia en el rendimiento de tu bicicleta. Visitanos en nuestra tienda física o explora nuestro catálogo online.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Calidad Garantizada */}
            <div className="col-md-4">
              <div 
                className="card h-100 shadow-lg overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '4px solid #32CD32',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.5s ease'
                }}
                onClick={() => toggleCard(2)}
              >
                <div className="card-body p-4 text-center">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#32CD32',
                      borderRadius: '50%'
                    }}
                  >
                    <span style={{ fontSize: '32px', color: 'white' }}>✓</span>
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-2">Calidad Garantizada</h3>
                  <p className="text-muted">Componentes confiables</p>
                  
                  {expandedCard === 2 && (
                    <div className="mt-3 pt-3 border-top text-start">
                      <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                        Trabajamos exclusivamente con marcas reconocidas mundialmente en el MTB. Cada componente que vendemos ha sido seleccionado por su durabilidad, rendimiento y resistencia a las condiciones extremas del ciclismo de montaña. Ofrecemos garantía en todos nuestros productos y asesoría técnica personalizada para que encuentres el componente perfecto para tu setup.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tarjeta 3: Envíos Rápidos */}
            <div className="col-md-4">
              <div 
                className="card h-100 shadow-lg overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '4px solid #ff7f50',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.5s ease'
                }}
                onClick={() => toggleCard(3)}
              >
                <div className="card-body p-4 text-center">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#ff7f50',
                      borderRadius: '50%'
                    }}
                  >
                    <span style={{ fontSize: '32px' }}>🚚</span>
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-2">Envíos Rápidos</h3>
                  <p className="text-muted">Transporte confiable</p>
                  
                  {expandedCard === 3 && (
                    <div className="mt-3 pt-3 border-top text-start">
                      <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                        Realizamos envíos a todo Chile a través de nuestra propia empresa de transporte, garantizando la seguridad y rapidez en la entrega de tus componentes. Contamos con embalaje especializado para productos delicados y seguimiento en tiempo real. La mayoría de nuestros envíos llegan en 24-48 horas en Santiago y 2-4 días a regiones.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Sección de Videos MTB */}
        <section className="mb-5">
          <h2 
            className="display-5 fw-bold text-center text-white mb-5"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Vive la Experiencia MTB
          </h2>
          <div className="row g-4">
            
            {/* Video 1 */}
            <div className="col-md-6">
              <div 
                className="card shadow-lg overflow-hidden"
                style={{
                  backgroundColor: 'rgba(50, 205, 50, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '4px solid #32CD32',
                  borderRadius: '1rem'
                }}
              >
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <video 
                    controls 
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  >
                    <source src="/assets/videos/video 1.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
                <div className="card-body p-3" style={{ backgroundColor: 'rgba(50, 205, 50, 0.3)' }}>
                  <h3 className="fs-5 fw-semibold text-white mb-2">Trail Riding Extremo</h3>
                  <p className="text-white-50 mb-0">Descubre la adrenalina del MTB en terrenos desafiantes</p>
                </div>
              </div>
            </div>

            {/* Video 2 */}
            <div className="col-md-6">
              <div 
                className="card shadow-lg overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 127, 80, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '4px solid #ff7f50',
                  borderRadius: '1rem'
                }}
              >
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <video 
                    controls 
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  >
                    <source src="/assets/videos/video 2.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
                <div className="card-body p-3" style={{ backgroundColor: 'rgba(255, 127, 80, 0.3)' }}>
                  <h3 className="fs-5 fw-semibold text-white mb-2">Componentes en Acción</h3>
                  <p className="text-white-50 mb-0">Ve cómo nuestros componentes rinden en competencia</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;