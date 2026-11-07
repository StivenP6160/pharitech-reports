const companyService = require('../services/companyService');

async function configureCompany(req, res) {
  const { created, company } = await companyService.configureCompany(req.body);
  res.status(created ? 201 : 200).json({
    message: created ? 'Empresa configurada correctamente' : 'Configuración actualizada',
    company,
  });
}

module.exports = { configureCompany };