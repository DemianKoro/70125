const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const logger = require('../logger');

const router = express.Router();

let products = [];

const loadProducts = () => {
  if (fs.existsSync('data/products.json')) {
    try {
      const data = fs.readFileSync('data/products.json', 'utf-8');
      products = JSON.parse(data);
    } catch (error) {
      logger.error('Error al cargar productos: ' + error.message);
      products = [];
    }
  }
};

const saveProducts = () => {
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
};

loadProducts();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    fs.mkdirSync(uploadPath, { recursive: true }); // Crea el directorio si no existe
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST new product
router.post('/', upload.single('thumbnail'), (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const existingProduct = products.find((product) => product.code === code);
  if (existingProduct) {
    return res.status(400).json({ error: 'El código del producto debe ser único' });
  }

  const newProduct = {
    id: String(Date.now()),
    title,
    description,
    code,
    price: parseFloat(price),
    stock: parseInt(stock),
    category,
    thumbnails: thumbnail ? [thumbnail] : [],
  };

  products.push(newProduct);
  saveProducts();
  logger.info(`POST /api/products - Producto añadido con código ${newProduct.code}`);
  res.status(201).json(newProduct);
});

// PUT update product by ID
router.put('/:id', upload.single('thumbnail'), (req, res) => {
  const { id } = req.params;
  const { title, description, code, price, stock, category } = req.body;
  const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Actualizar producto:', { id, title, description, code, price, stock, category, thumbnail });

  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  try {
    product.title = title;
    product.description = description;
    product.code = code;
    product.price = parseFloat(price);
    product.stock = parseInt(stock);
    product.category = category;
    if (thumbnail) {
      product.thumbnails = [thumbnail];
    }

    saveProducts();
    logger.info(`PUT /api/products/${id} - Producto actualizado con ID ${id}`);
    res.status(200).json(product);
  } catch (error) {
    logger.error('Error al actualizar el producto: ' + error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
