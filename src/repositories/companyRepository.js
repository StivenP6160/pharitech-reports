const pool = require('../config/db');

async function saveCompanyWithBranding({ name, slug, branding }) {
  // Pedimos una conexión propia para hacer una transacción
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const existing = await client.query('SELECT id FROM companies WHERE slug = $1', [slug]);

    let companyId;
    let created;
    if (existing.rows.length > 0) {
      companyId = existing.rows[0].id;
      created = false;
      await client.query('UPDATE companies SET name = $1 WHERE id = $2', [name, companyId]);
    } else {
      const inserted = await client.query(
        'INSERT INTO companies (name, slug) VALUES ($1, $2) RETURNING id',
        [name, slug],
      );
      companyId = inserted.rows[0].id;
      created = true;
    }

    // Si ya tiene configuración, la reemplaza; si no, la crea
    await client.query(
      `INSERT INTO company_configs (company_id, branding) VALUES ($1, $2)
       ON CONFLICT (company_id) DO UPDATE SET branding = EXCLUDED.branding`,
      [companyId, branding],
    );

    await client.query('COMMIT');
    return { id: companyId, created };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release(); // devuelve la conexión al pool
  }
}

module.exports = { saveCompanyWithBranding };