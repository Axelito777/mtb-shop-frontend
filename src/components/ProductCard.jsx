// ProductCard.jsx - Tarjeta de producto (ACTUALIZADO)
import { useNavigate } from 'react-router-dom'; // ← NUEVO
import { addToCart } from '../services/cartService';
import { getCurrentUser } from '../services/authService';

function ProductCard({ product }) {
  const navigate = useNavigate(); // ← NUEVO

  // Emojis por categoría
  const emojis = {
    'cascos': '🪖',
    'pedales': '🦶',
    'cadenas': '⛓️',
    'frenos': '🛑',
    'neumaticos': '🛞',
    'mazas': '⚙️',
    'cambios': '🔧',
    'bielas': '⚙️',
    'manillares': '🚴',
    'suspensiones': '🔩',
    'horquillas': '🔱'
  };

  const emoji = emojis[product.category] || '🔧';

  // Ir al detalle del producto ← NUEVO
  const handleViewDetail = () => {
    navigate(`/productos/${product.id}`);
  };

  // Agregar al carrito
  const handleAddToCart = (e) => {
    e.stopPropagation(); // ← Evita que se active el click de la card
    
    const user = getCurrentUser();
    
    if (!user) {
      alert('Debes iniciar sesión para agregar productos');
      navigate('/login');
      return;
    }

    addToCart(product);
    alert(`${product.name} agregado al carrito!`);
    
    // Recargar para actualizar el contador
    window.location.reload();
  };

  return (
    <div 
      className="card h-100 shadow-sm" 
      style={{ cursor: 'pointer' }} // ← NUEVO
      onClick={handleViewDetail} // ← NUEVO
    >
      {/* Imagen o emoji */}
      <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '4rem' }}>{emoji}</span>
        )}
      </div>

      {/* Información del producto */}
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        
        {/* Estrellas */}
        <div className="mb-2">
          <span className="text-warning">⭐⭐⭐⭐⭐</span>
          <small className="text-muted ms-2">(4.8)</small>
        </div>

        {/* Precio */}
        <p className="card-text">
          <strong className="text-success fs-5">
            ${product.price.toLocaleString()}
          </strong>
        </p>

        {/* Botones */}
        <div className="d-flex gap-2">
          {/* Botón ver detalle ← NUEVO */}
          <button 
            className="btn btn-outline-secondary flex-grow-1"
            onClick={handleViewDetail}
          >
            Ver más
          </button>
          
          {/* Botón agregar al carrito */}
          <button 
            className="btn btn-success flex-grow-1"
            onClick={handleAddToCart}
          >
            🛒 Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;