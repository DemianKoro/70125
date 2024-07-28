import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, description, code, price, stock, category };
    try {
      await axios.post('http://localhost:8080/api/products', newBook);
      alert('Libro añadido!');
    } catch (error) {
      console.error('Error al añadir el libro', error);
    }
  };

  return (
    <div className="add-book">
      <h2>Agregar Nuevo Libro</h2>
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
        <button type="submit" className="btn btn-primary">Agregar Libro</button>
      </form>
    </div>
  );
}

export default AddBook;
