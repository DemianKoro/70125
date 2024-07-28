import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        const book = response.data;
        setTitle(book.title);
        setDescription(book.description);
        setCode(book.code);
        setPrice(book.price);
        setStock(book.stock);
        setCategory(book.category);
      } catch (error) {
        console.error('Error al obtener el libro', error);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = { title, description, code, price, stock, category };
    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, updatedBook);
      alert('Libro actualizado!');
      history.push('/books');
    } catch (error) {
      console.error('Error al actualizar el libro', error);
    }
  };

  return (
    <div className="edit-book">
      <h2>Editar Libro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Código</label>
          <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Seleccionar</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Terror">Terror</option>
            <option value="Fantasía">Fantasía</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Libro</button>
      </form>
    </div>
  );
}

export default EditBook;
