// Contact.jsx - Página de contacto
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simular envío (en producción real, aquí iría una API)
    console.log('Formulario enviado:', formData);
    
    setSubmitted(true);
    
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        {/* Formulario de contacto */}
        <div className="col-lg-8">
          <h2 className="mb-4">Contáctanos 📧</h2>

          {submitted ? (
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">¡Mensaje enviado con éxito! ✅</h4>
              <p>Gracias por contactarnos. Responderemos tu consulta lo antes posible.</p>
              <hr />
              <p className="mb-0">Nuestro equipo te contactará dentro de las próximas 24 horas.</p>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <p className="text-muted mb-4">
                  ¿Tienes alguna pregunta o comentario? Completa el formulario y nos pondremos en contacto contigo.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre Completo *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Juan Pérez"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="juan@example.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Asunto *</label>
                      <select
                        className={`form-select ${errors.subject ? 'is-invalid' : ''}`}
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="consulta">Consulta general</option>
                        <option value="producto">Información de producto</option>
                        <option value="pedido">Estado de pedido</option>
                        <option value="devolucion">Devolución o cambio</option>
                        <option value="soporte">Soporte técnico</option>
                        <option value="otro">Otro</option>
                      </select>
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Mensaje *</label>
                      <textarea
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escribe tu mensaje aquí..."
                      ></textarea>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                      <small className="text-muted">Mínimo 10 caracteres</small>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-success btn-lg w-100">
                        📧 Enviar Mensaje
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Información de contacto */}
        <div className="col-lg-4">
          <div className="sticky-top" style={{ top: '20px' }}>
            {/* Información general */}
            <div className="card shadow-sm mb-3">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">📍 Información de Contacto</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <h6 className="text-success">📞 Teléfono</h6>
                  <p className="mb-0">+56 9 1234 5678</p>
                  <small className="text-muted">Lun - Vie: 9:00 - 18:00</small>
                </div>
                <hr />
                <div className="mb-3">
                  <h6 className="text-success">📧 Email</h6>
                  <p className="mb-0">
                    <a href="mailto:info@mtbshop.com">info@mtbshop.com</a>
                  </p>
                  <small className="text-muted">Respuesta en 24 horas</small>
                </div>
                <hr />
                <div className="mb-3">
                  <h6 className="text-success">💬 WhatsApp</h6>
                  <p className="mb-0">+56 9 8765 4321</p>
                  <small className="text-muted">Lun - Sáb: 9:00 - 20:00</small>
                </div>
                <hr />
                <div>
                  <h6 className="text-success">📍 Dirección</h6>
                  <p className="mb-0">
                    Av. Providencia 1234<br />
                    Santiago, Región Metropolitana<br />
                    Chile
                  </p>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="card shadow-sm mb-3">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">🕐 Horario de Atención</h5>
              </div>
              <div className="card-body">
                <table className="table table-sm mb-0">
                  <tbody>
                    <tr>
                      <td><strong>Lunes - Viernes</strong></td>
                      <td className="text-end">9:00 - 18:00</td>
                    </tr>
                    <tr>
                      <td><strong>Sábado</strong></td>
                      <td className="text-end">10:00 - 14:00</td>
                    </tr>
                    <tr>
                      <td><strong>Domingo</strong></td>
                      <td className="text-end text-danger">Cerrado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">🌐 Síguenos</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <a href="#" className="btn btn-outline-primary btn-sm">
                    📘 Facebook
                  </a>
                  <a href="#" className="btn btn-outline-info btn-sm">
                    🐦 Twitter
                  </a>
                  <a href="#" className="btn btn-outline-danger btn-sm">
                    📷 Instagram
                  </a>
                  <a href="#" className="btn btn-outline-dark btn-sm">
                    💼 LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa (decorativo) */}
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="mb-3">📍 Nuestra Ubicación</h4>
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="bg-light text-center" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                  <span style={{ fontSize: '5rem' }}>🗺️</span>
                  <p className="text-muted mt-3">
                    Mapa de Google Maps<br />
                    <small>Av. Providencia 1234, Santiago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preguntas frecuentes rápidas */}
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="mb-3">❓ Preguntas Frecuentes</h4>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  ¿Cuál es el tiempo de envío?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Los envíos se realizan en 3-5 días hábiles para la Región Metropolitana y 5-7 días para regiones.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  ¿Tienen garantía los productos?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Sí, todos nuestros productos cuentan con garantía de 2 años contra defectos de fabricación.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                  ¿Puedo cambiar o devolver un producto?
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Tienes 30 días para cambios y devoluciones. El producto debe estar sin uso y en su empaque original.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;