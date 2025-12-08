import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const productData = await getProductById(id);
      if (productData) {
        setProduct(productData);
      } else {
        alert('Producto no encontrado');
        navigate('/productos');
      }
    } catch (error) {
      console.error('Error cargando producto:', error);
      alert('Error al cargar el producto');
      navigate('/productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Obtener carrito actual
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Actualizar cantidad
      const newQuantity = cart[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stock) {
        alert(`Solo hay ${product.stock} unidades disponibles`);
        return;
      }

      cart[existingItemIndex].quantity = newQuantity;
    } else {
      // Agregar nuevo producto
      if (quantity > product.stock) {
        alert(`Solo hay ${product.stock} unidades disponibles`);
        return;
      }

      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        stock: product.stock,
        imageUrl: product.imageUrl,
        brand: product.brand
      });
    }

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert('Producto agregado al carrito');
    navigate('/carrito');
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      alert('No hay más stock disponible');
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <div className="container loading">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="container error">Producto no encontrado</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate('/productos')} className="back-button">
          ← Volver a Productos
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/500'} 
              alt={product.name}
            />
          </div>

          <div className="product-detail-info">
            <div className="product-category">
              {product.category?.name || 'Sin categoría'}
            </div>

            <h1>{product.name}</h1>

            <div className="product-brand">
              <strong>Marca:</strong> {product.brand || 'N/A'}
            </div>

            {product.model && (
              <div className="product-model">
                <strong>Modelo:</strong> {product.model}
              </div>
            )}

            <div className="product-price">
              ${product.price.toLocaleString('es-CL')}
            </div>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">
                  ✓ En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="out-of-stock">
                  ✗ Sin stock
                </span>
              )}
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>

            {product.stock > 0 && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Cantidad:</label>
                  <div className="quantity-controls">
                    <button onClick={decrementQuantity}>-</button>
                    <span className="quantity-display">{quantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                  </div>
                </div>

                <button onClick={handleAddToCart} className="add-to-cart-btn">
                  🛒 Agregar al Carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;