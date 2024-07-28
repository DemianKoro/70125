import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Biblioteca</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">Libros</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">Agregar Libro</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
