import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Usamos Link para el botón de "Ver más"
import axios from 'axios';
import '../styles/Home.css'; 
import '../styles/FlipCards.css';

const Home = () => {
  const [noticiasDestacadas, setNoticiasDestacadas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const noticiasPerPage = 6; // Mostrar 6 noticias por página

  useEffect(() => {
    const fetchDestacadas = async () => {
      try {
        // Cambia esta línea para cargar el JSON desde la carpeta public
        const response = await axios.get('/data/data.json'); 

        // Ordenar las noticias por fechaPublicacion en orden descendente
        const noticiasOrdenadas = response.data.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));

        setNoticiasDestacadas(noticiasOrdenadas);
      } catch (error) {
        console.error('Error al cargar las noticias destacadas:', error);
      }
    };

    fetchDestacadas();
  }, []);

  // Calcular los índices de las noticias que deben mostrarse en la página actual
  const indexOfLastNoticia = currentPage * noticiasPerPage;
  const indexOfFirstNoticia = indexOfLastNoticia - noticiasPerPage;
  const currentNoticias = noticiasDestacadas.slice(indexOfFirstNoticia, indexOfLastNoticia);

  // Manejar el cambio de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Sección con video de fondo y contenido superpuesto */}
      <div className="header-content">
        <video autoPlay muted loop id="bg-video">
          <source src="/Pic/Escuela Superior de Ingenieria Informatica y Cs Agroalimentarias _2020.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>

        <div className="overlay-content">
          <h1>Boletín de la Escuela Superior de Ingeniería, Informática y Ciencias Agroalimentarias</h1>
          <p className="lead">Noticias y novedades de nuestra escuela. Mantente informado</p>

          {/* Botón para redirigir a la página de noticias generales */}
          <div className="text-center mt-4">
            <Link to="/noticias" className="btn btn-gradient">
              Ver todas las noticias
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de noticias destacadas */}
      <div className="container1 mt-5">
        <h2 className="noticias-destacadas-heading">Noticias Destacadas</h2>
        <div className="row">
          {currentNoticias.map((noticia) => (
            <div className="col-md-4 mb-4" key={noticia.id}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  {/* Lado Frontal de la tarjeta */}
                  <div className="flip-card-front">
                    <img
                      src={noticia.imagen} // Suponiendo que la imagen está en la misma ruta que el JSON
                      alt="Imagen de la noticia"
                      className="card-img-top img-fluid flip-img"
                    />
                    <h5 className="card-title">{noticia.titulo}</h5>
                  </div>
                  {/* Lado Trasero de la tarjeta */}
                  <div className="flip-card-back">
                    <h5>{noticia.titulo}</h5>
                    <p>{noticia.copete}</p>
                    <p className="text-muted">
                      {new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <Link to={`/noticia/${noticia.id}`} className="btn btn-primary">
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination-container">
          <button
            className="btn btn-secondary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastNoticia >= noticiasDestacadas.length}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Botón para redirigir a la página de noticias generales */}
      <div className="text-center mt-4">
        <Link to="/noticias" className="btn btn-gradient">
          Ver todas las noticias
        </Link>
      </div>

      <br />
    </div>
  );
};

export default Home;








