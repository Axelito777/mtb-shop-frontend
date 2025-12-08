import { useState } from 'react';
import { login, register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(loginData);
      
      if (response.success) {
      window.location.href = '/productos'; // Esto recarga la página
    } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await register(registerData);
      
      if (response.success) {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión');
        setIsLogin(true);
        setRegisterData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phone: '',
          address: ''
        });
      } else {
        setError(response.message || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            onClick={() => setIsLogin(true)}
            className={isLogin ? 'active' : ''}
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={!isLogin ? 'active' : ''}
          >
            Registrarse
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Iniciar Sesión</h2>
            
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required
            />
            
            <input
              type="password"
              placeholder="Contraseña"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
            
            <button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar'}
            </button>

            <div className="test-credentials">
              <small>
                <strong>Prueba con:</strong><br/>
                Email: superadmin@mtb.com<br/>
                Password: admin123
              </small>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <h2>Crear Cuenta</h2>
            
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              required
            />
            
            <input
              type="password"
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              required
              minLength="6"
            />
            
            <input
              type="text"
              placeholder="Nombre"
              value={registerData.firstName}
              onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
              required
            />
            
            <input
              type="text"
              placeholder="Apellido"
              value={registerData.lastName}
              onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
              required
            />
            
            <input
              type="tel"
              placeholder="Teléfono"
              value={registerData.phone}
              onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
            />
            
            <input
              type="text"
              placeholder="Dirección"
              value={registerData.address}
              onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
            />
            
            <button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;