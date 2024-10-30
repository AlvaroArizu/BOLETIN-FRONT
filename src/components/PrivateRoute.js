import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);  // Estado para la autenticación
  const [loading, setLoading] = useState(true);  // Estado para mostrar el "spinner" de carga

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);  // Terminar la carga
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/verifyToken`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error('Error verificando el token:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);  // Terminar la carga
      }
    };

    verifyToken();
  }, []);

  // Mostrar un indicador de carga mientras verificamos la autenticación
  if (loading) {
    return <div>Cargando...</div>;  // Puedes agregar un spinner o un componente de carga aquí
  }

  // Si el usuario está autenticado, mostrar el contenido de la ruta
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;


