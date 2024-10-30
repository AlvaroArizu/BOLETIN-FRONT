import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NoticiasForm.css'; 

const NoticiasForm = ({ onSuccess }) => {
  const [titulo, setTitulo] = useState('');
  const [copete, setCopete] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null); // Para la vista previa
  const [destacada, setDestacada] = useState(false);
  const [tituloWarning, setTituloWarning] = useState('');
  const [copeteWarning, setCopeteWarning] = useState('');

  const tituloWordLimit = 9; 
  const copeteWordLimit = 18; 

  const handleTituloChange = (e) => {
    const inputValue = e.target.value;
    const wordCount = inputValue.trim().split(/\s+/).filter(word => word.length > 0).length;

    if (wordCount <= tituloWordLimit) {
      setTitulo(inputValue);
      setTituloWarning('');
    } else {
      setTituloWarning(`El título no puede exceder las ${tituloWordLimit} palabras.`);
    }
  };

  const handleCopeteChange = (e) => {
    const inputValue = e.target.value;
    const wordCount = inputValue.trim().split(/\s+/).filter(word => word.length > 0).length;

    if (wordCount <= copeteWordLimit) {
      setCopete(inputValue);
      setCopeteWarning('');
    } else {
      setCopeteWarning(`El copete no puede exceder las ${copeteWordLimit} palabras.`);
    }
  };

  // Función para manejar la carga de la imagen y generar la vista previa
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result); // Guardar la URL de vista previa
      };
      reader.readAsDataURL(file);
    } else {
      setImagen(null);
      setImagenPreview(null); // Limpiar vista previa si no hay imagen
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('copete', copete);
    formData.append('descripcion', descripcion);
    formData.append('destacada', destacada ? 1 : 0);

    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/noticias`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Noticia publicada exitosamente');
      onSuccess();  
    } catch (error) {
      console.error('Error al publicar la noticia:', error);
      alert('Error al publicar la noticia');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h3>Crear Nueva Noticia</h3>

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={handleTituloChange} 
            className="form-control"
            placeholder="Ingrese el título de la noticia"
            required 
          />
          {tituloWarning && <small className="form-text text-danger">{tituloWarning}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Copete</label>
          <textarea 
            value={copete} 
            onChange={handleCopeteChange} 
            className="form-control"
            placeholder="Ingrese el copete de la noticia"
            rows="3"
            required 
          />
          {copeteWarning && <small className="form-text text-danger">{copeteWarning}</small>}
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
            onChange={handleImagenChange} 
            className="form-control"
            accept="image/png, image/jpeg" 
          />
          <small className="form-text">Formato permitido: JPG, PNG. Tamaño máximo: 5MB</small>
        </div>

        {/* Mostrar vista previa de la imagen */}
        {imagenPreview && (
          <div className="mb-3">
            <label className="form-label">Vista previa de la imagen:</label>
            <img 
              src={imagenPreview} 
              alt="Vista previa" 
              style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
            />
          </div>
        )}

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
          <button type="submit" className="btn btn-lg">Publicar Noticia</button>
        </div>
      </form>
    </div>
  );
};

export default NoticiasForm;










