import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoticiasForm from './NoticiasForm';
import NoticiasList from './NoticiasList'; 
import NoticiasSeeker from './NoticiasSeeker'; // Importa el componente de búsqueda
import '../styles/NoticiasForm.css'; 

const AdminPanel = () => {
  const [noticias, setNoticias] = useState([]);
  const [filteredNoticias, setFilteredNoticias] = useState([]);  // Estado para noticias filtradas
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos

  // Función para obtener todas las noticias
  const fetchNoticias = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/noticias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNoticias(response.data);
      setFilteredNoticias(response.data); // Inicialmente, todas las noticias están filtradas
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
      alert('Error al cargar las noticias');
    } finally {
      setLoading(false);  // Finalizar el estado de carga
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  // Función que se ejecuta cuando se publica una noticia
  const handleSuccess = () => {
    fetchNoticias();  // Actualizar la lista de noticias después de una acción exitosa
  };

  // Función para manejar la búsqueda de noticias
  const handleSearch = (searchTerm) => {
    const filtered = noticias.filter((noticia) =>
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNoticias(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Administrador de Noticias</h1>

      {/* Mostrar indicador de carga si las noticias están cargando */}
      {loading ? (
        <div className="text-center">Cargando noticias...</div>
      ) : (
        <>
          {/* Formulario para crear noticias */}
          <div className="mb-5">
            <NoticiasForm 
              onSuccess={handleSuccess}  // Función para actualizar después de crear
            />
          </div>

          {/* Buscador de noticias */}
          <div className="mb-5">
            <NoticiasSeeker 
              onSubmit={handleSearch}  // Pasamos la función handleSearch al buscador
            />
          </div>

          {/* Lista de noticias publicadas */}
          <div className="mb-5">
            <NoticiasList 
              noticias={filteredNoticias}  // Pasamos la lista de noticias filtradas
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;




