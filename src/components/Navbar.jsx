import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout, isAdmin } from '../services/authService';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar usuario al montar componente
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚴 MTB Shop
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/ofertas">Ofertas</Link></li>
          
          {user ? (
            <>
              {/* Mostrar Admin si es admin */}
              {isAdmin() && (
                <li><Link to="/admin">⚙️ Admin</Link></li>
              )}
              
              <li><Link to="/profile">👤 {user.firstName}</Link></li>
              <li><Link to="/orders">Mis Compras</Link></li>
              <li><Link to="/carrito">🛒 Carrito</Link></li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">🔐 Iniciar Sesión</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;