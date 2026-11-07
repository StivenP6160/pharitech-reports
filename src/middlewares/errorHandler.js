const AppError = require('../utils/AppError');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ code: err.code, message: err.message, details: err.details });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ code: 'MALFORMED_JSON', message: 'El cuerpo no es un JSON válido', details: [] });
  }
  console.error(err); // errores inesperados: se registran, pero no se le muestran al cliente
  return res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Ocurrió un error inesperado', details: [] });
}

module.exports = errorHandler;