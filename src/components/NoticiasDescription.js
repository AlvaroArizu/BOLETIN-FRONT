import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/NoticiasDescription.css'; 

const NoticiasDescription = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        // Cargar todas las noticias desde el archivo JSON
        const response = await axios.get('/data/data.json');
        const noticias = response.data;

        // Buscar la noticia por ID
        const foundNoticia = noticias.find((n) => n.id === parseInt(id)); // Asegúrate de que 'id' sea un número
        if (foundNoticia) {
          setNoticia(foundNoticia);
        } else {
          setError('No se encontró la noticia.');
        }
      } catch (error) {
        setError('Hubo un error al cargar la noticia.');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) {
    return <p>Cargando noticia...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card noticia-description-card shadow-lg p-4 border-0 rounded-lg">
        {/* Título de la noticia */}
        <h1 className="noticia-title">{noticia.titulo}</h1>

        {/* Fecha de publicación estilizada */}
        <p className="noticia-fecha">
          {new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Imagen de la noticia */}
        {noticia.imagen && (
          <div className="text-center mb-4">
            <img
              src={noticia.imagen} // Suponiendo que la imagen está en la misma ruta que el JSON
              alt="Imagen de la noticia"
              className="img-fluid rounded shadow noticia-img"
            />
          </div>
        )}

        {/* Descripción completa */}
        <p className="noticia-descripcion">
          {noticia.descripcion}
        </p>
      </div>

      {/* Botón para volver a la página anterior */}
      <div className="mt-4 text-center">
        <button
          className="btn-custom-volver"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <br /><br />
    </div>
  );
};

export default NoticiasDescription;



