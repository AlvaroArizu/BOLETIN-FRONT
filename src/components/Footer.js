import React from 'react';
import '../styles/Footer.css'; // Ruta del archivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Sección de logos a la izquierda */}
          <div className="col-md-4 d-flex align-items-center">
            <img 
              src="/Pic/logo-UM.png" 
              alt="Logo UM" 
              className="logo-icon-footer me-3"  /* Añadido margen a la derecha */
            />
            <img 
              src="/Pic/ESIICA1.png" 
              alt="Logo ESIICA" 
              className="logo-icon-footer"
            />
          </div>

          {/* Social media icons */}
          <div className="col-md-8 text-center">
            <ul className="list-inline social-list">
              <li className="list-inline-item">
                <a href="mailto:esiica2024@unimoron.edu.ar" className="text-white" target="_blank" rel="noopener noreferrer" aria-label="Correo">
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com/unimoron.edu.ar" className="text-white" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="http://www.youtube.com/@UniversidaddeMoronUM" className="text-white" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.linkedin.com/school/umoficial/" className="text-white" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li className="list-inline-item container-twitter">
                <a href="https://twitter.com/uni_moron" className="text-white" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-x-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <small>BOLETÍN - UM</small><br />
          <small>Diseñado por Álvaro Arizu</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

