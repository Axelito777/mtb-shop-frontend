import PropTypes from 'prop-types';

function CartItem({ item, onRemove, onUpdateQuantity }) {
  const handleIncrement = () => {
    if (item.quantity < item.stock) {
      onUpdateQuantity(item.quantity + 1);
    } else {
      alert('No hay más stock disponible');
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    } else {
      onRemove();
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img 
          src={item.imageUrl || 'https://via.placeholder.com/150'} 
          alt={item.name}
        />
      </div>

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p className="cart-item-brand">{item.brand}</p>
        <p className="cart-item-price">${item.price.toLocaleString('es-CL')}</p>
      </div>

      <div className="cart-item-quantity">
        <button 
          onClick={handleDecrement}
          className="quantity-btn"
          aria-label="Disminuir cantidad"
        >
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button 
          onClick={handleIncrement}
          className="quantity-btn"
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        <p>Subtotal:</p>
        <p className="subtotal-price">
          ${(item.price * item.quantity).toLocaleString('es-CL')}
        </p>
      </div>

      <button 
        onClick={onRemove}
        className="cart-item-remove"
        aria-label="Eliminar producto"
      >
        🗑️
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    brand: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};

export default CartItem;