const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let carts = [];

// Cargar los datos del carrito desde el archivo
const loadCarts = () => {
  const filePath = path.join(__dirname, '../data/carts.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    carts = JSON.parse(data);
  }
};

// Guardar los datos del carrito en el archivo
const saveCarts = () => {
  const filePath = path.join(__dirname, '../data/carts.json');
  fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
};

loadCarts();

// Obtener todos los items del carrito
router.get('/', (req, res) => {
  res.json(carts);
});

// Agregar un producto al carrito
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  const cartItem = carts.find(item => item.productId === productId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    carts.push({ productId, quantity });
  }

  saveCarts();
  res.status(201).json({ message: 'Producto agregado al carrito' });
});

// Eliminar un producto del carrito
router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  carts = carts.filter(item => item.productId !== productId);

  saveCarts();
  res.status(200).json({ message: 'Producto eliminado del carrito' });
});

module.exports = router;
