// "Tiendas Éxito" -> "tiendas-exito". Así "D1" y "d1" son la misma empresa.
function slugify(text) {
  return String(text)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')   // espacios y símbolos -> guion
    .replace(/^-+|-+$/g, '');      // sin guiones al inicio o al final
}

module.exports = slugify;