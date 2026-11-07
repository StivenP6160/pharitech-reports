// Un error "esperado" (dato inválido, empresa no existe...) con su código HTTP
class AppError extends Error {
  constructor(status, code, message, details = []) {
    super(message);
    this.status = status;   // 400, 404...
    this.code = code;       // 'VALIDATION_ERROR'
    this.details = details; // lista de qué falló
  }
}

module.exports = AppError;