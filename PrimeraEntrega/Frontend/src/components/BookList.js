import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setBooks(response.data);
      } catch (error) {
        console.error('Error al obtener los libros', error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error al eliminar el libro', error);
    }
  };

  return (
    <div className="book-list">
      <h2>Lista de Libros</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Código</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.code}</td>
              <td>{book.price}</td>
              <td>{book.stock}</td>
              <td>{book.category}</td>
              <td>
                <Link to={`/edit/${book.id}`} className="btn btn-warning">Editar</Link>
                <button onClick={() => handleDelete(book.id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
