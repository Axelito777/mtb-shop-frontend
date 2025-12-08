import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Mi Perfil</h1>
        
        <div className="profile-info">
          <div className="info-item">
            <strong>Nombre:</strong>
            <p>{user.firstName} {user.lastName}</p>
          </div>

          <div className="info-item">
            <strong>Email:</strong>
            <p>{user.email}</p>
          </div>

          <div className="info-item">
            <strong>Teléfono:</strong>
            <p>{user.phone || 'No especificado'}</p>
          </div>

          <div className="info-item">
            <strong>Dirección:</strong>
            <p>{user.address || 'No especificada'}</p>
          </div>

          <div className="info-item">
            <strong>Rol:</strong>
            <p>{user.role === 'ADMIN' ? '👑 Administrador' : '👤 Usuario'}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate('/orders')} className="btn-primary">
            Mis Compras
          </button>
          <button onClick={handleLogout} className="btn-danger">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;