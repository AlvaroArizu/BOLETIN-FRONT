import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
      localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
      navigate('/admin'); // Redirigir a la página de administración
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-lg p-4 border-0 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
          <h2 className="mb-4 text-center" style={{ fontWeight: 'bold', color: '#333' }}>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label" style={{ color: '#555', fontWeight: '500' }}>Usuario</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-0" style={{ padding: '0.5rem 1rem', borderRadius: '50px 0 0 50px' }}>
                  <i className="fa fa-user" style={{ color: '#888', fontSize: '1.2rem' }}></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 rounded-pill"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingrese su usuario"
                  required
                  style={{ paddingLeft: '0.75rem' }}  // Agregamos más padding para separar el texto del ícono.
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label" style={{ color: '#555', fontWeight: '500' }}>Contraseña</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-0" style={{ padding: '0.5rem 1rem', borderRadius: '50px 0 0 50px' }}>
                  <i className="fa fa-lock" style={{ color: '#888', fontSize: '1.2rem' }}></i>
                </span>
                <input
                  type="password"
                  className="form-control border-0 rounded-pill"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  required
                  style={{ paddingLeft: '0.75rem' }}  // Igual que en el campo de usuario.
                />
              </div>
            </div>
            {error && <div className="alert alert-danger text-center rounded-pill" style={{ backgroundColor: '#ffdddd', color: '#d9534f' }}>{error}</div>}
            <button type="submit" className="btn w-100 rounded-pill" style={{ background: 'linear-gradient(135deg, #4b79a1, #283e51)', color: '#fff', fontWeight: '600', transition: 'background 0.3s', padding: '0.75rem' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Login;




