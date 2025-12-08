import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import CartItem from '../components/CartItem';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    // Cargar carrito del localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  };

  const updateCart = (newCart) => {
    // Actualizar el estado Y el localStorage
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (productId) => {
    // Filtrar el producto eliminado
    const newCart = cartItems.filter(item => item.id !== productId);
    updateCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    // Actualizar cantidad del producto
    const newCart = cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    updateCart(newCart);
  };

  const clearCart = () => {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      updateCart([]);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    const user = getCurrentUser();
    if (!user) {
      alert('Debes iniciar sesión para continuar');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    navigate('/checkout');
  };

  if (loading) {
    return <div className="container loading">Cargando carrito...</div>;
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>🛒 Mi Carrito</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <button onClick={() => navigate('/productos')} className="btn-primary">
              Ver Productos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
                />
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span className="price">${calculateTotal().toLocaleString('es-CL')}</span>
                </div>
                <div className="summary-row">
                  <span>Envío:</span>
                  <span className="price">Gratis</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span className="price">${calculateTotal().toLocaleString('es-CL')}</span>
                </div>

                <div className="cart-actions">
                  <button onClick={clearCart} className="btn-danger">
                    Vaciar Carrito
                  </button>
                  <button onClick={handleCheckout} className="btn-success">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;