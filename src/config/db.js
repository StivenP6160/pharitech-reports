const { Pool } = require('pg');

// Pool = un grupo de conexiones listas para usar.
// En vez de abrir y cerrar una conexión en cada consulta, se reutilizan.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;