// Checkout.jsx - Página de proceso de pago
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, getCartTotal, clearCart } from '../services/cartService';
import { getCurrentUser } from '../services/authService';

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit-card'
  });

  const [errors, setErrors] = useState({});

  // Verificar autenticación y cargar carrito
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      alert('Debes iniciar sesión para realizar una compra');
      navigate('/login');
      return;
    }

    const cartItems = getCart();
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      navigate('/productos');
      return;
    }

    setCart(cartItems);
    setTotal(getCartTotal());

    // Pre-llenar datos del usuario
    setFormData(prev => ({
      ...prev,
      fullName: user.name || '',
      email: user.email || ''
    }));
  }, [navigate]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    // Validaciones de datos personales
    if (!formData.fullName.trim()) newErrors.fullName = 'Nombre completo es requerido';
    if (!formData.email.trim()) newErrors.email = 'Email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono es requerido';
    if (!formData.address.trim()) newErrors.address = 'Dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'Ciudad es requerida';
    if (!formData.region.trim()) newErrors.region = 'Región es requerida';

    // Validaciones de pago (solo si es tarjeta)
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Número de tarjeta requerido';
      else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos)';
      }
      if (!formData.cardName.trim()) newErrors.cardName = 'Nombre en tarjeta requerido';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Fecha de expiración requerida';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV requerido';
      else if (formData.cvv.length !== 3) newErrors.cvv = 'CVV debe tener 3 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Procesar pago
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    setLoading(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      // Guardar orden en localStorage
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cart,
        total: total,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          region: formData.region
        },
        paymentMethod: formData.paymentMethod,
        status: 'completed'
      };

      // Guardar en historial de órdenes
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Limpiar carrito
      clearCart();

      // Redirigir a éxito
      navigate('/checkout/success', { state: { order } });
    }, 2000);
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Finalizar Compra</h2>

      <div className="row">
        {/* Formulario */}
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            {/* Datos Personales */}
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">📝 Datos Personales</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+56 9 1234 5678"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Dirección *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Ciudad *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Región *</label>
                    <select
                      className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="metropolitana">Región Metropolitana</option>
                      <option value="valparaiso">Valparaíso</option>
                      <option value="biobio">Bío Bío</option>
                      <option value="araucania">Araucanía</option>
                      <option value="los-lagos">Los Lagos</option>
                    </select>
                    {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Código Postal</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">💳 Método de Pago</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      Tarjeta de Crédito/Débito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="transfer"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="transfer">
                      Transferencia Bancaria
                    </label>
                  </div>
                </div>

                {/* Campos de tarjeta */}
                {formData.paymentMethod === 'credit-card' && (
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Número de Tarjeta *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Nombre en la Tarjeta *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="JUAN PEREZ"
                      />
                      {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha de Expiración *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        maxLength="5"
                      />
                      {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">CVV *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="3"
                      />
                      {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate('/carrito')}
                disabled={loading}
              >
                ← Volver al Carrito
              </button>
              <button
                type="submit"
                className="btn btn-success flex-grow-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Procesando...
                  </>
                ) : (
                  <>🔒 Finalizar Compra</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">📦 Resumen del Pedido</h5>
            </div>
            <div className="card-body">
              {/* Items */}
              <div className="mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <div>
                      <small>{item.name}</small>
                      <br />
                      <small className="text-muted">Cantidad: {item.quantity}</small>
                    </div>
                    <div>
                      <small className="fw-bold">
                        ${(item.price * item.quantity).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="mb-2 d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="mb-2 d-flex justify-content-between">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span className="text-success">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;