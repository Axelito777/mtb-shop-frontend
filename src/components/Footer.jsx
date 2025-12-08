// Footer.jsx - Pie de página (ACTUALIZADO con todas las páginas)
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <div className="container">
        <div className="row">
          {/* Columna 1: Sobre nosotros */}
          <div className="col-md-3 mb-3">
            <h5 className="mb-3">🚴 MTB Shop</h5>
            <p className="text-white-50 small">
              Tu tienda especializada en componentes para Mountain Bike. 
              Calidad y pasión por el ciclismo desde 2013.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="col-md-3 mb-3">
            <h5 className="mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/productos" className="text-white-50 text-decoration-none">
                  Productos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/ofertas" className="text-white-50 text-decoration-none">
                  Ofertas
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/nosotros" className="text-white-50 text-decoration-none">
                  Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-white-50 text-decoration-none">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Cuenta */}
          <div className="col-md-3 mb-3">
            <h5 className="mb-3">Mi Cuenta</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/login" className="text-white-50 text-decoration-none">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-white-50 text-decoration-none">
                  Mi Perfil
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/orders" className="text-white-50 text-decoration-none">
                  Mis Compras
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/carrito" className="text-white-50 text-decoration-none">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="col-md-3 mb-3">
            <h5 className="mb-3">Contacto</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2">
                📍 Av. Providencia 1234<br />
                Santiago, Chile
              </li>
              <li className="mb-2">
                📞 +56 9 1234 5678
              </li>
              <li className="mb-2">
                📧 info@mtbshop.com
              </li>
              <li className="mb-2">
                🕐 Lun-Vie: 9:00-18:00
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Redes sociales y copyright */}
        <div className="row">
          <div className="col-md-6 mb-2">
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 text-decoration-none">
                <i className="bi bi-facebook"></i> Facebook
              </a>
              <a href="#" className="text-white-50 text-decoration-none">
                <i className="bi bi-instagram"></i> Instagram
              </a>
              <a href="#" className="text-white-50 text-decoration-none">
                <i className="bi bi-twitter"></i> Twitter
              </a>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-white-50 small mb-0">
              © 2024 MTB Shop. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;