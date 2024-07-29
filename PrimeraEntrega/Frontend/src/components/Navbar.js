import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/books">Libros</Link>
      <Link to="/add">Agregar Libro</Link>
      <Link to="/cart">Carrito</Link>
    </nav>
  );
};

export default Navbar;
