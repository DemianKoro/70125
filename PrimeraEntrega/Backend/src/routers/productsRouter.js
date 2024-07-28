const express = require('express');
const fs = require('fs');
const logger = require('../logger'); // Asegúrate de que esta ruta sea correcta

const router = express.Router();

let products = [];

const loadProducts = () => {
  if (fs.existsSync('data/products.json')) {
    const data = fs.readFileSync('data/products.json');
    products = JSON.parse(data);
  }
};

const saveProducts = () => {
  fs.writeFileSync('data/products.json', JSON.stringify(products));
};

loadProducts();

const generateId = () => {
  const maxId = products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) : 0;
  return String(maxId + 1);
};

// GET all products
router.get('/', (req, res) => {
  logger.info('GET /api/products - Todos los productos solicitados');
  res.json(products);
});

// GET product by ID
router.get('/:pid', (req, res) => {
  const product = products.find(p => p.id === req.params.pid);
  if (product) {
    logger.info(`GET /api/products/${req.params.pid} - Producto solicitado`);
    res.json(product);
  } else {
    logger.error(`GET /api/products/${req.params.pid} - Producto no encontrado`);
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// POST new product
router.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    logger.error('POST /api/products - Campos obligatorios faltantes');
    return res.status(400).json({ error: 'Todos los campos excepto thumbnails son obligatorios' });
  }

  const existingProduct = products.find(p => p.code === code);
  if (existingProduct) {
    logger.error('POST /api/products - El código del producto debe ser único');
    return res.status(400).json({ error: 'El código del producto debe ser único' });
  }

  const newProduct = {
    id: generateId(),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || []
  };

  products.push(newProduct);
  saveProducts();
  logger.info(`POST /api/products - Nuevo producto añadido con ID ${newProduct.id}`);
  res.status(201).json(newProduct);
});

// PUT update product by ID
router.put('/:pid', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.pid);
  if (productIndex === -1) {
    logger.error(`PUT /api/products/${req.params.pid} - Producto no encontrado`);
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const product = products[productIndex];

  if (code && code !== product.code) {
    const existingProduct = products.find(p => p.code === code);
    if (existingProduct) {
      logger.error('PUT /api/products - El código del producto debe ser único');
      return res.status(400).json({ error: 'El código del producto debe ser único' });
    }
  }

  products[productIndex] = {
    ...product,
    title: title || product.title,
    description: description || product.description,
    code: code || product.code,
    price: price || product.price,
    stock: stock || product.stock,
    category: category || product.category,
    thumbnails: thumbnails || product.thumbnails
  };

  saveProducts();
  logger.info(`PUT /api/products/${req.params.pid} - Producto actualizado`);
  res.json(products[productIndex]);
});

// DELETE product by ID
router.delete('/:pid', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.pid);
  if (productIndex === -1) {
    logger.error(`DELETE /api/products/${req.params.pid} - Producto no encontrado`);
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  products.splice(productIndex, 1);
  saveProducts();
  logger.info(`DELETE /api/products/${req.params.pid} - Producto eliminado`);
  res.status(204).send();
});

module.exports = router;
