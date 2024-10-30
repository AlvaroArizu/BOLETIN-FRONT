import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NoticiasSeeker.css'; 

const NoticiasSeeker = () => {
  const [searchTerm, setSearchTerm] = useState('');  // Estado para almacenar el término de búsqueda
  const [resultados, setResultados] = useState([]);  // Estado para almacenar los resultados de la búsqueda
  const [loading, setLoading] = useState(false);     // Estado para manejar la carga

  // Función para manejar el envío del formulario de búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/noticias`, {
        params: {
          q: searchTerm   // Enviar el término de búsqueda al backend como parámetro de consulta
        }
      });
      setResultados(response.data);  // Guardar los resultados de la búsqueda
    } catch (error) {
      console.error('Error al buscar noticias:', error);
    } finally {
      setLoading(false);  // Desactivar el estado de carga
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 search-title">Buscar Noticias</h2>
  
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className="mb-4 search-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button className="btn btn-search" type="submit">Buscar</button>
        </div>
      </form>
  
      {/* Spinner de carga */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div>
          {resultados.length === 0 ? (
            <p className="text-center">No se encontraron noticias.</p>
          ) : (
            <div className="row">
              {resultados.map((noticia) => (
                <div className="col-md-4 mb-4" key={noticia.id}>
                  <div className="card h-100 noticia-card shadow-sm">
                    {noticia.imagen && (
                      <img
                        src={`${process.env.REACT_APP_API_URL.replace('/api', '')}${noticia.imagen}`}
                        className="card-img-top img-fluid noticia-imagen"
                        alt="Imagen de la noticia"
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title noticia-title">{noticia.titulo}</h5>
                      <p className="card-text noticia-text">{noticia.copete}</p>
                      <p className="text-muted noticia-fecha mt-auto">
                        {new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default NoticiasSeeker;
