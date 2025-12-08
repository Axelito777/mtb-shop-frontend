// CheckoutSuccess.jsx - Página de compra exitosa
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CheckoutSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    // Si no hay orden, redirigir a productos
    if (!order) {
      navigate('/productos');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Mensaje de éxito */}
          <div className="text-center mb-4">
            <div className="mb-3">
              <span style={{ fontSize: '5rem' }}>✅</span>
            </div>
            <h1 className="text-success mb-2">¡Compra Exitosa!</h1>
            <p className="text-muted fs-5">
              Tu pedido ha sido procesado correctamente
            </p>
          </div>

          {/* Tarjeta de información */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              {/* Número de orden */}
              <div className="alert alert-success mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Número de Orden:</strong>
                    <br />
                    <span className="fs-5">#{order.id}</span>
                  </div>
                  <div className="text-end">
                    <small className="text-muted">
                      {new Date(order.date).toLocaleDateString('es-CL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </small>
                  </div>
                </div>
              </div>

              {/* Detalles del pedido */}
              <h5 className="mb-3">📦 Detalle del Pedido</h5>
              <div className="table-responsive mb-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-end">Precio</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">${item.price.toLocaleString()}</td>
                        <td className="text-end">
                          ${(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end fw-bold">Total:</td>
                      <td className="text-end fw-bold text-success fs-5">
                        ${order.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Información de envío */}
              <h5 className="mb-3">🚚 Información de Envío</h5>
              <div className="row mb-4">
                <div className="col-md-6">
                  <p className="mb-1">
                    <strong>Nombre:</strong><br />
                    {order.customer.name}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong><br />
                    {order.customer.email}
                  </p>
                  <p className="mb-1">
                    <strong>Teléfono:</strong><br />
                    {order.customer.phone}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1">
                    <strong>Dirección:</strong><br />
                    {order.customer.address}
                  </p>
                  <p className="mb-1">
                    <strong>Ciudad:</strong><br />
                    {order.customer.city}
                  </p>
                  <p className="mb-1">
                    <strong>Región:</strong><br />
                    {order.customer.region}
                  </p>
                </div>
              </div>

              {/* Método de pago */}
              <div className="alert alert-info">
                <strong>💳 Método de Pago:</strong>{' '}
                {order.paymentMethod === 'credit-card' ? 'Tarjeta de Crédito/Débito' : 'Transferencia Bancaria'}
              </div>

              {/* Próximos pasos */}
              <div className="bg-light p-3 rounded">
                <h6 className="mb-2">📋 Próximos Pasos:</h6>
                <ul className="mb-0">
                  <li>Recibirás un email de confirmación en {order.customer.email}</li>
                  <li>Tu pedido será procesado en las próximas 24 horas</li>
                  <li>El envío llegará en 3-5 días hábiles</li>
                  <li>Recibirás un código de seguimiento cuando se despache</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-success btn-lg"
              onClick={() => navigate('/productos')}
            >
              Seguir Comprando
            </button>
            <button
              className="btn btn-outline-success btn-lg"
              onClick={() => window.print()}
            >
              🖨️ Imprimir Recibo
            </button>
          </div>

          {/* Mensaje adicional */}
          <div className="text-center mt-4">
            <p className="text-muted">
              ¿Necesitas ayuda? Contáctanos a{' '}
              <a href="mailto:soporte@mtbshop.com">soporte@mtbshop.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;