const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Formato del mensaje de log
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Crear logger
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(), // Muestra los logs en consola
    new transports.File({ filename: 'logs.txt' }) // Guarda los logs en un archivo
  ]
});

module.exports = logger;
