
const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

// Ruta de prueba: confirma que la API y la base de datos responden
router.get('/health', async (req, res) => {
  const { rows } = await pool.query('SELECT NOW() AS hora');
  res.json({ status: 'ok', database: 'conectada', hora: rows[0].hora });
});

module.exports = router;