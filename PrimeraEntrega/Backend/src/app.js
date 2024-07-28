const express = require('express');
const logger = require('./logger');
const productsRouter = require('./routers/productsRouter');
const cartsRouter = require('./routers/cartsRouter');
const cors = require('cors'); // Para permitir solicitudes desde el front-end

const app = express();

app.use(express.json());
app.use(cors()); // Permitir solicitudes de cualquier origen
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
  logger.info('Servidor escuchando en el puerto 8080');
});
