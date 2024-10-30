import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NoticiasForm from './components/NoticiasForm';
import NoticiasList from './components/NoticiasList';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'; 
import NoticiasPublic from './components/NoticiasPublic'; // Página pública para ver noticias
import NoticiasDescription from './components/NoticiasDescription'; // Página de detalles de noticia
import Home from './components/Home'; // Página principal
import Footer from './components/Footer';
import NoticiasSeeker from './components/NoticiasSeeker'; // Componente del buscador de noticias
import './styles/Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [updateList, setUpdateList] = useState(false);
  const [editNoticia, setEditNoticia] = useState(null);

  const handleEdit = (noticia) => {
    setEditNoticia(noticia);
  };

  const handleSuccess = () => {
    setUpdateList(!updateList);
    setEditNoticia(null);
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              {/* Logo de la aplicación */}
              <img 
                src="/Pic/logo0.png" // Ruta del logo dentro de la carpeta public
                alt="Logo de NoticiasApp" 
                className="logo-icon-small" // Clase de CSS para controlar el tamaño del logo
              />
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Panel Administrador</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Rutas */}
        <Routes>
          {/* Ruta pública: Página principal */}
          <Route path="/" element={<Home />} />

          {/* Ruta pública: Noticias visibles sin login */}
          <Route path="/noticias" element={<NoticiasPublic />} />

          {/* Nueva ruta: Detalle de la noticia */}
          <Route path="/noticia/:id" element={<NoticiasDescription />} />

          {/* Ruta pública: Página de inicio de sesión */}
          <Route path="/login" element={<Login />} />

          {/* Ruta del buscador de noticias */}
          <Route path="/buscar-noticias" element={<NoticiasSeeker />} />

          {/* Ruta privada: Administrador de noticias */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <div className="container mt-5">
                <h1 className="admin-title">Administrador de Noticias</h1>

                  {/* Formulario para crear o editar noticias */}
                  <div className="mb-5">
                    <NoticiasForm 
                      onSuccess={handleSuccess} 
                      noticiaEditada={editNoticia} 
                    />
                  </div>

                  {/* Lista de noticias publicadas */}
                  <div className="mb-5">
                    <NoticiasList 
                      key={updateList} 
                      onEdit={handleEdit} 
                    />
                  </div>
                </div>
              </PrivateRoute>
            } 
          />
        </Routes>

        {/* Footer */}
        <Footer /> {/* Esto asegura que el footer esté en todas las páginas */}
      </div>
    </Router>
  );
}

export default App;




