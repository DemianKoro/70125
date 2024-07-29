import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

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

  return (
    <div className="background-wood">
      <h2>Lista de Libros</h2>
      <div className="books">
        {books.map((book) => (
          <div key={book.code} className="book-card">
            <Link to={`/product/${book.id}`}>
              {book.thumbnails.length > 0 && (
                <img src={`http://localhost:8080${book.thumbnails[0]}`} alt={book.title} className="book-image" />
              )}
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p><strong>Precio:</strong> ${book.price}</p>
                <p><strong>Categoría:</strong> {book.category}</p>
                <p><strong>Stock:</strong> {book.stock}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
