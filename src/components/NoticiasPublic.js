import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Usamos Link para redirigir a la página de detalles
import axios from 'axios';
import '../styles/NoticiasPublic.css'; 

const NoticiasPublic = () => {
  const [noticias, setNoticias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const noticiasPorPagina = 6; // Número máximo de noticias por página
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredNoticias, setFilteredNoticias] = useState([]); // Noticias filtradas por búsqueda

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        // Cargar las noticias desde el archivo JSON
        const response = await axios.get('/data/data.json'); 
        
        // Ordenar las noticias por fechaPublicacion en orden descendente
        const noticiasOrdenadas = response.data.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
        
        setNoticias(noticiasOrdenadas);
        setFilteredNoticias(noticiasOrdenadas); // Inicialmente, las noticias filtradas son todas
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      }
    };

    fetchNoticias();
  }, []);

  // Filtrar las noticias según el término de búsqueda
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredNoticias(noticias);
    } else {
      const filtered = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.copete.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNoticias(filtered);
    }
  }, [searchTerm, noticias]);

  // Calcular las noticias a mostrar en la página actual
  const indexOfLastNoticia = currentPage * noticiasPorPagina;
  const indexOfFirstNoticia = indexOfLastNoticia - noticiasPorPagina;
  const noticiasActuales = filteredNoticias.slice(indexOfFirstNoticia, indexOfLastNoticia);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="ultimas-noticias-heading">Últimas Noticias</h2>

      {noticias.length === 0 ? (
        <p className="text-center">No hay noticias disponibles.</p>
      ) : (
        <>
          {/* Formulario de búsqueda */}
          <form className="d-flex justify-content-center mb-4 search-form">
            <div className="input-group" style={{ maxWidth: '500px', width: '100%' }}>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          <div className="row">
            {noticiasActuales.map((noticia) => (
              <div className="col-md-4 mb-4" key={noticia.id}>
                <div className="card noticia-card h-100">
                  {noticia.imagen && (
                    <img
                      src={noticia.imagen} // Suponiendo que la imagen está en la misma ruta que el JSON
                      className="card-img-top img-fluid noticia-imagen"
                      alt="Imagen de la noticia"
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{noticia.titulo}</h5>
                    <p className="card-text">{noticia.copete}</p>
                    <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: 'auto' }}>
                      {new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <br />
                    <div className="mt-auto">
                      <Link to={`/noticia/${noticia.id}`} className="btn btn-vermas">
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-secondary pag-btn mx-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            <button
              className="btn btn-secondary pag-btn mx-2"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastNoticia >= filteredNoticias.length}
            >
              Siguiente
            </button>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default NoticiasPublic;






