// CheckoutError.jsx - Página de error en el pago
import { useNavigate, useLocation } from 'react-router-dom';

function CheckoutError() {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.message || 'Ocurrió un error al procesar tu pago';

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Mensaje de error */}
          <div className="text-center mb-4">
            <div className="mb-3">
              <span style={{ fontSize: '5rem' }}>❌</span>
            </div>
            <h1 className="text-danger mb-2">¡Pago Rechazado!</h1>
            <p className="text-muted fs-5">
              No se pudo procesar tu pago
            </p>
          </div>

          {/* Tarjeta de información del error */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              {/* Mensaje de error */}
              <div className="alert alert-danger mb-4">
                <h5 className="alert-heading mb-2">
                  <strong>⚠️ Error en la transacción</strong>
                </h5>
                <p className="mb-0">{errorMessage}</p>
              </div>

              {/* Posibles causas */}
              <h5 className="mb-3">🔍 Posibles Causas</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="text-danger">✗</span> Fondos insuficientes en la tarjeta
                </li>
                <li className="mb-2">
                  <span className="text-danger">✗</span> Datos de la tarjeta incorrectos
                </li>
                <li className="mb-2">
                  <span className="text-danger">✗</span> Tarjeta bloqueada o vencida
                </li>
                <li className="mb-2">
                  <span className="text-danger">✗</span> Límite de compra excedido
                </li>
                <li className="mb-2">
                  <span className="text-danger">✗</span> Problema de conexión con el banco
                </li>
              </ul>

              <hr className="my-4" />

              {/* Qué hacer ahora */}
              <h5 className="mb-3">💡 ¿Qué puedes hacer?</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="card-title">1️⃣ Verificar Datos</h6>
                      <p className="card-text small mb-0">
                        Revisa que el número de tarjeta, fecha de vencimiento y CVV sean correctos.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="card-title">2️⃣ Contactar Banco</h6>
                      <p className="card-text small mb-0">
                        Comunícate con tu banco para verificar el estado de tu tarjeta.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="card-title">3️⃣ Usar Otra Tarjeta</h6>
                      <p className="card-text small mb-0">
                        Intenta con otro método de pago o tarjeta diferente.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="card-title">4️⃣ Intentar Más Tarde</h6>
                      <p className="card-text small mb-0">
                        Puede ser un problema temporal. Intenta nuevamente en unos minutos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Información de soporte */}
              <div className="alert alert-info">
                <h6 className="alert-heading">
                  <strong>📞 ¿Necesitas Ayuda?</strong>
                </h6>
                <p className="mb-2">
                  Nuestro equipo está disponible para ayudarte:
                </p>
                <ul className="mb-0">
                  <li>📧 Email: <a href="mailto:soporte@mtbshop.com">soporte@mtbshop.com</a></li>
                  <li>📱 WhatsApp: +56 9 1234 5678</li>
                  <li>🕐 Horario: Lunes a Viernes 9:00 - 18:00</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <button
              className="btn btn-success btn-lg"
              onClick={() => navigate('/checkout')}
            >
              🔄 Reintentar Pago
            </button>
            <button
              className="btn btn-outline-success btn-lg"
              onClick={() => navigate('/carrito')}
            >
              ← Volver al Carrito
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate('/productos')}
            >
              Seguir Comprando
            </button>
          </div>

          {/* Mensaje de seguridad */}
          <div className="text-center mt-4 p-3 bg-light rounded">
            <small className="text-muted">
              <strong>🔒 Pago Seguro</strong><br />
              Tu información está protegida con encriptación SSL de 256 bits.
              Nunca almacenamos los datos completos de tu tarjeta.
            </small>
          </div>

          {/* Métodos de pago alternativos */}
          <div className="mt-4 text-center">
            <p className="text-muted mb-2">Aceptamos múltiples métodos de pago:</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <span className="badge bg-light text-dark p-2">💳 Visa</span>
              <span className="badge bg-light text-dark p-2">💳 Mastercard</span>
              <span className="badge bg-light text-dark p-2">💳 American Express</span>
              <span className="badge bg-light text-dark p-2">🏦 Transferencia</span>
              <span className="badge bg-light text-dark p-2">💰 WebPay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutError;