import { useState, useEffect } from 'react';
import { productService } from '../services/api';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getAll();
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Error al cargar productos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Productos MTB Shop</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.map(product => (
          <div 
            key={product.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px',
              borderRadius: '8px'
            }}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Modelo:</strong> {product.model}</p>
            <p style={{ fontSize: '24px', color: '#28a745' }}>
              ${product.price?.toLocaleString('es-CL')}
            </p>
            <p>Stock: {product.stock} unidades</p>
            <button 
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;