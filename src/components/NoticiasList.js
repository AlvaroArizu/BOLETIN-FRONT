import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NoticiasList.css';

const NoticiasList = () => {
  const [noticias, setNoticias] = useState([]);
  const [filteredNoticias, setFilteredNoticias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNoticia, setEditingNoticia] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Definir fetchNoticias fuera del useEffect para poder reutilizarla
  const fetchNoticias = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/noticias`);
      setNoticias(response.data);
      setFilteredNoticias(response.data);
    } catch (error) {
      alert('Error al cargar las noticias');
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  // Lógica de filtrado del buscador
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = noticias.filter((noticia) =>
      noticia.titulo.toLowerCase().includes(searchValue) ||
      noticia.copete.toLowerCase().includes(searchValue) ||
      noticia.descripcion.toLowerCase().includes(searchValue)
    );
    setFilteredNoticias(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/noticias/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNoticias(noticias.filter((n) => n.id !== id));
        setFilteredNoticias(filteredNoticias.filter((n) => n.id !== id));
      } catch (error) {
        alert('Error al eliminar la noticia');
      }
    }
  };

  const handleEditClick = (noticia) => {
    setEditingNoticia(noticia);
    setImagePreview(`${process.env.REACT_APP_API_URL.replace('/api', '')}${noticia.imagen}`); // Mostrar la imagen actual
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Vista previa de la nueva imagen seleccionada
        setEditingNoticia({ ...editingNoticia, imagenFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateNoticia = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('titulo', editingNoticia.titulo);
    formData.append('copete', editingNoticia.copete);
    formData.append('descripcion', editingNoticia.descripcion);
    formData.append('destacada', editingNoticia.destacada);
  
    // Si no se selecciona una nueva imagen, mantenemos la imagen actual
    if (editingNoticia.imagenFile) {
      formData.append('imagen', editingNoticia.imagenFile);  // Nueva imagen cargada
    } else {
      formData.append('imagen', editingNoticia.imagen);  // Mantener la imagen existente
    }
  
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/noticias/${editingNoticia.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      setEditingNoticia(null);
      fetchNoticias();  // Aquí se reutiliza la función fetchNoticias
    } catch (error) {
      alert('Error al actualizar la noticia');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Noticias Publicadas</h2>

      {/* Agregar buscador de noticias */}
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Buscar noticias por título, copete o descripción..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      {editingNoticia ? (
        <div className="edit-form card p-4 mb-5">
        <h3 className="mb-4 text-center">Editar Noticia</h3>
        <form onSubmit={handleUpdateNoticia}>
          <div className="form-group mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={editingNoticia.titulo}
              onChange={(e) => setEditingNoticia({ ...editingNoticia, titulo: e.target.value })}
              placeholder="Título de la noticia"
              required
            />
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="copete" className="form-label">Copete</label>
            <textarea
              id="copete"
              className="form-control"
              value={editingNoticia.copete}
              onChange={(e) => setEditingNoticia({ ...editingNoticia, copete: e.target.value })}
              placeholder="Copete"
              required
              rows="3"
            ></textarea>
          </div>
      
          <div className="form-group mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              className="form-control"
              value={editingNoticia.descripcion}
              onChange={(e) => setEditingNoticia({ ...editingNoticia, descripcion: e.target.value })}
              placeholder="Descripción"
              required
              rows="5"
            ></textarea>
          </div>
      
          <div className="form-group mb-4">
            <label htmlFor="imagen" className="form-label">Imagen</label>
            <input
              type="file"
              id="imagen"
              className="form-control"
              onChange={handleImageChange} // Maneja la vista previa de la imagen
            />
          </div>

          {/* Vista previa de la imagen */}
          {imagePreview && (
            <div className="form-group mb-4 text-center">
              <img
                src={imagePreview}
                alt="Vista previa de la imagen"
                style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain', borderRadius: '12px' }}
              />
            </div>
          )}
      
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success px-4">Guardar cambios</button>
            <button type="button" className="btn btn-secondary px-4" onClick={() => setEditingNoticia(null)}>Cancelar</button>
          </div>
        </form>
      </div>
      
      ) : (
        <div className="row">
          {filteredNoticias.length === 0 ? (
            <p className="alert alert-info text-center">No hay noticias que coincidan con tu búsqueda.</p>
          ) : (
            filteredNoticias.map((noticia) => (
              <div className="col-md-6 mb-4" key={noticia.id}>
                <div className="card h-100 shadow-sm">
                  {noticia.imagen && (
                    <img
                      src={`${process.env.REACT_APP_API_URL.replace('/api', '')}${noticia.imagen}`}
                      className="card-img-top img-fluid"
                      alt="Imagen de la noticia"
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{noticia.titulo}</h5>
                    <p className="card-text"><strong>Copete:</strong> {noticia.copete}</p>
                    <p className="card-text">{noticia.descripcion}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-primary" onClick={() => handleEditClick(noticia)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(noticia.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NoticiasList;







