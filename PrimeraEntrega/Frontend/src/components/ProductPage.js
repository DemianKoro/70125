import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCode(response.data.code);
        setPrice(response.data.price);
        setStock(response.data.stock);
        setCategory(response.data.category);
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('code', code);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Producto actualizado!');
      setEditMode(false);
      history.go(0); // Recargar la página para actualizar el producto
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:8080/api/carts', {
        productId: id,
        quantity,
      });
      alert('Producto agregado al carrito!');
    } catch (error) {
      console.error('Error al agregar el producto al carrito', error);
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="product-page background-wood">
      <h2>Detalles del Producto</h2>
      {editMode ? (
        <form onSubmit={handleUpdate}>
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
          <div className="form-group">
            <label>Imagen</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Actualizar Producto</button>
        </form>
      ) : (
        <div>
          {product.thumbnails.length > 0 && (
            <img src={`http://localhost:8080${product.thumbnails[0]}`} alt={product.title} className="product-image" />
          )}
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p><strong>Código:</strong> {product.code}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              max={product.stock}
            />
          </div>
          <button onClick={handleAddToCart} className="btn btn-primary">Agregar al Carrito</button>
          <button onClick={() => setEditMode(true)} className="btn btn-secondary">Editar Producto</button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
