import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/carts');
        setCart(response.data);
      } catch (error) {
        console.error('Error al obtener el carrito', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos', error);
      }
    };

    fetchCart();
    fetchProducts();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carts/${productId}`);
      setCart(cart.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error al eliminar el producto del carrito', error);
    }
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId) || {};
  };

  return (
    <div className="background-wood cart-container">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => {
            const productDetails = getProductDetails(item.productId);
            return (
              <div key={item.productId} className="cart-item">
                {productDetails.thumbnails && productDetails.thumbnails.length > 0 && (
                  <img src={`http://localhost:8080${productDetails.thumbnails[0]}`} alt={productDetails.title} className="cart-item-image" />
                )}
                <div className="cart-item-details">
                  <h3>{productDetails.title}</h3>
                  <p><strong>Precio:</strong> ${productDetails.price}</p>
                  <p><strong>Cantidad:</strong> {item.quantity}</p>
                  <button onClick={() => handleRemoveProduct(item.productId)}>Eliminar</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
