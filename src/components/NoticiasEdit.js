import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoticiasEdit = ({ noticiaEditada, onSuccess }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [destacada, setDestacada] = useState(false);

  // Sincronizar los valores de la noticia editada con el formulario
  useEffect(() => {
    if (noticiaEditada) {
      setTitulo(noticiaEditada.titulo || '');
      setDescripcion(noticiaEditada.descripcion || '');
      setDestacada(noticiaEditada.destacada === 1);
      setImagen(noticiaEditada.imagen || null);  // Mantenemos la URL de la imagen original
    }
  }, [noticiaEditada]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('destacada', destacada ? 1 : 0);

    // Solo agregamos la imagen si es un archivo nuevo
    if (imagen && typeof imagen !== 'string') {
      formData.append('imagen', imagen); 
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/noticias/${noticiaEditada.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Noticia actualizada exitosamente');
      onSuccess();  // Función para actualizar la lista de noticias
    } catch (error) {
      console.error('Error al actualizar la noticia:', error);
      alert('Error al actualizar la noticia');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 p-4 shadow-sm bg-white rounded border">
      <h3 className="mb-4 text-primary">Editar Noticia</h3>

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input 
          type="text" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          className="form-control"
          placeholder="Ingrese el título de la noticia"
          required 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          className="form-control"
          placeholder="Ingrese una descripción breve"
          rows="5"
          required 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen (opcional)</label>
        <input 
          type="file" 
          onChange={(e) => setImagen(e.target.files[0])}  // Cambiar solo si es un archivo
          className="form-control"
        />
        <small className="form-text text-muted">Formato permitido: JPG, PNG. Tamaño máximo: 5MB</small>
      </div>

      <div className="mb-3 form-check">
        <input 
          type="checkbox" 
          className="form-check-input"
          checked={destacada} 
          onChange={(e) => setDestacada(e.target.checked)} 
        />
        <label className="form-check-label">¿Noticia destacada?</label>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-lg btn-primary">Actualizar Noticia</button>
      </div>
    </form>
  );
};

export default NoticiasEdit;


