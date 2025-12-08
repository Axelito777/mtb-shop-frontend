// Orders.jsx - Página de historial de compras
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Debes iniciar sesión');
      navigate('/login');
      return;
    }

    setUser(currentUser);

    // Obtener órdenes del usuario
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter(order => order.customer.email === currentUser.email);
    
    // Ordenar por fecha más reciente
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setOrders(userOrders);
  }, [navigate]);

  const getStatusBadge = (status) => {
    const badges = {
      'completed': 'bg-success',
      'pending': 'bg-warning',
      'cancelled': 'bg-danger',
      'shipped': 'bg-info'
    };
    return badges[status] || 'bg-secondary';
  };

  const getStatusText = (status) => {
    const texts = {
      'completed': 'Completado',
      'pending': 'Pendiente',
      'cancelled': 'Cancelado',
      'shipped': 'Enviado'
    };
    return texts[status] || 'Desconocido';
  };

  if (orders.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="mb-4">
          <span style={{ fontSize: '5rem' }}>📦</span>
        </div>
        <h2 className="mb-3">No tienes compras realizadas</h2>
        <p className="text-muted mb-4">¡Explora nuestro catálogo y realiza tu primera compra!</p>
        <button className="btn btn-success btn-lg" onClick={() => navigate('/productos')}>
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Mis Compras 📦</h2>

      <div className="row">
        {/* Lista de órdenes */}
        <div className="col-lg-8">
          {orders.map((order) => (
            <div key={order.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  {/* Info principal */}
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-2">
                      <h5 className="mb-0 me-3">Orden #{order.id}</h5>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-muted mb-2">
                      <small>
                        📅 {new Date(order.date).toLocaleDateString('es-CL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
                    </p>
                    <p className="mb-2">
                      <strong>Total:</strong> 
                      <span className="text-success ms-2 fs-5">
                        ${order.total.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-muted mb-0">
                      <small>
                        {order.items.length} producto{order.items.length > 1 ? 's' : ''}
                      </small>
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <button
                      className="btn btn-outline-success w-100"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>

                {/* Mini resumen de productos */}
                <div className="mt-3 pt-3 border-top">
                  <div className="d-flex flex-wrap gap-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <span key={index} className="badge bg-light text-dark">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="badge bg-light text-dark">
                        +{order.items.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de estadísticas */}
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Resumen de Compras</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-muted mb-2">Total de Órdenes</h6>
                <h3 className="text-success mb-0">{orders.length}</h3>
              </div>
              <hr />
              <div className="mb-3">
                <h6 className="text-muted mb-2">Total Gastado</h6>
                <h3 className="text-success mb-0">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                </h3>
              </div>
              <hr />
              <div className="mb-3">
                <h6 className="text-muted mb-2">Productos Comprados</h6>
                <h3 className="text-success mb-0">
                  {orders.reduce((sum, order) => sum + order.items.reduce((s, i) => s + i.quantity, 0), 0)}
                </h3>
              </div>
              <hr />
              <div>
                <h6 className="text-muted mb-2">Estado de Órdenes</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Completadas:</span>
                  <strong className="text-success">
                    {orders.filter(o => o.status === 'completed').length}
                  </strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Enviadas:</span>
                  <strong className="text-info">
                    {orders.filter(o => o.status === 'shipped').length}
                  </strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Pendientes:</span>
                  <strong className="text-warning">
                    {orders.filter(o => o.status === 'pending').length}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalle de orden */}
      {selectedOrder && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Detalle de Orden #{selectedOrder.id}</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Información general */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="text-muted">Fecha de Compra</h6>
                    <p>{new Date(selectedOrder.date).toLocaleDateString('es-CL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-muted">Estado</h6>
                    <span className={`badge ${getStatusBadge(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>

                {/* Productos */}
                <h6 className="mb-3">Productos</h6>
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
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
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
                          ${selectedOrder.total.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Información de envío */}
                <h6 className="mb-3">Información de Envío</h6>
                <div className="card bg-light">
                  <div className="card-body">
                    <p className="mb-2">
                      <strong>Nombre:</strong> {selectedOrder.customer.name}
                    </p>
                    <p className="mb-2">
                      <strong>Email:</strong> {selectedOrder.customer.email}
                    </p>
                    <p className="mb-2">
                      <strong>Teléfono:</strong> {selectedOrder.customer.phone}
                    </p>
                    <p className="mb-2">
                      <strong>Dirección:</strong> {selectedOrder.customer.address}
                    </p>
                    <p className="mb-0">
                      <strong>Ciudad:</strong> {selectedOrder.customer.city}, {selectedOrder.customer.region}
                    </p>
                  </div>
                </div>

                {/* Método de pago */}
                <div className="alert alert-info mt-3">
                  <strong>💳 Método de Pago:</strong>{' '}
                  {selectedOrder.paymentMethod === 'credit-card' 
                    ? 'Tarjeta de Crédito/Débito' 
                    : 'Transferencia Bancaria'}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setSelectedOrder(null)}
                >
                  Cerrar
                </button>
                <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={() => window.print()}
                >
                  🖨️ Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;