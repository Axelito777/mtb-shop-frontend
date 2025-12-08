import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

function Offers() {
  const [products, setProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const productsData = await getProducts();
      
      // Crear ofertas con descuentos aleatorios
      const productsWithDiscounts = productsData.map(product => ({
        ...product,
        originalPrice: product.price,
        discount: Math.floor(Math.random() * 4) * 10 + 10, // 10%, 20%, 30% o 40%
        discountedPrice: Math.round(product.price * (1 - (Math.floor(Math.random() * 4) * 10 + 10) / 100))
      }));

      // Seleccionar productos aleatorios (70% de los productos)
      const shuffled = productsWithDiscounts.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.ceil(productsWithDiscounts.length * 0.7));
      
      setProducts(productsData);
      setOfferProducts(selected);
    } catch (error) {
      console.error('Error cargando ofertas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container loading">Cargando ofertas...</div>;

  return (
    <div className="offers-page">
      <div className="container">
        <h1>🔥 Ofertas Especiales MTB</h1>
        <p className="subtitle">¡Descuentos increíbles en componentes seleccionados!</p>

        <div className="offers-banner">
          <div className="banner-content">
            <h2>¡MEGA LIQUIDACIÓN!</h2>
            <p>Hasta 40% de descuento en productos seleccionados</p>
            <div className="banner-stats">
              <div className="stat">
                <span className="stat-number">{offerProducts.length}</span>
                <span className="stat-label">Productos en oferta</span>
              </div>
              <div className="stat">
                <span className="stat-number">-{Math.max(...offerProducts.map(p => p.discount))}%</span>
                <span className="stat-label">Descuento máximo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="products-grid">
          {offerProducts.length > 0 ? (
            offerProducts.map(product => (
              <div key={product.id} className="offer-product-card">
                <div className="discount-badge">
                  -{product.discount}%
                </div>
                <ProductCard product={product} isOffer={true} />
                <div className="price-comparison">
                  <span className="old-price">
                    ${product.originalPrice.toLocaleString('es-CL')}
                  </span>
                  <span className="new-price">
                    ${product.discountedPrice.toLocaleString('es-CL')}
                  </span>
                  <span className="savings">
                    Ahorras: ${(product.originalPrice - product.discountedPrice).toLocaleString('es-CL')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-offers">
              <p>No hay ofertas disponibles en este momento</p>
            </div>
          )}
        </div>

        <div className="offers-footer">
          <p>* Ofertas válidas hasta agotar stock</p>
          <p>* Los precios ya incluyen el descuento</p>
        </div>
      </div>
    </div>
  );
}

export default Offers;