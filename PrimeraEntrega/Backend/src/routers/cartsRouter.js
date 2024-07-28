const express = require('express');
const fs = require('fs');
const logger = require('../logger'); // Asegúrate de que esta ruta sea correcta

const router = express.Router();

let carts = [];

const loadCarts = () => {
  if (fs.existsSync('data/carts.json')) {
    const data = fs.readFileSync('data/carts.json');
    carts = JSON.parse(data);
  }
};

const saveCarts = () => {
  fs.writeFileSync('data/carts.json', JSON.stringify(carts));
};

loadCarts();

// POST new cart
router.post('/', (req, res) => {
  const newCart = {
    id: String(Date.now()),
    products: []
  };

  carts.push(newCart);
  saveCarts();
  logger.info(`POST /api/carts - Nuevo carrito creado con ID ${newCart.id}`);
  res.status(201).json(newCart);
});

// GET cart by ID
router.get('/:cid', (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    logger.info(`GET /api/carts/${req.params.cid} - Carrito solicitado`);
    res.json(cart);
  } else {
    logger.error(`GET /api/carts/${req.params.cid} - Carrito no encontrado`);
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// POST add product to cart
router.post('/:cid/product/:pid', (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (!cart) {
    logger.error(`POST /api/carts/${req.params.cid}/product/${req.params.pid} - Carrito no encontrado`);
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const { pid } = req.params;
  const { quantity } = req.body;
  const existingProduct = cart.products.find(p => p.product === pid);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ product: pid, quantity });
  }

  saveCarts();
  logger.info(`POST /api/carts/${req.params.cid}/product/${pid} - Producto añadido al carrito`);
  res.status(201).json(cart);
});

module.exports = router;
