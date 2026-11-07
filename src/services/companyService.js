const { z } = require('zod');
const companyRepository = require('../repositories/companyRepository');
const AppError = require('../utils/AppError');
const slugify = require('../utils/slugify');

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'debe ser un color hexadecimal, ej: #E30613');

// Cómo debe verse el body
const companySchema = z.object({
  name: z.string({ error: 'es obligatorio y debe ser texto' }).trim().min(2, 'debe tener al menos 2 caracteres').max(100),
  logo: z.string({ error: 'es obligatorio' }).trim().regex(/^https?:\/\/\S+$/i, 'debe ser una URL http o https'),
  textos: z.record(z.string(), z.string()).optional(),
  colores: z.object({ primario: hexColor.optional(), texto: hexColor.optional() }).optional(),
});

async function configureCompany(body) {
  const result = companySchema.safeParse(body ?? {});
  if (!result.success) {
    const details = result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
    throw new AppError(400, 'VALIDATION_ERROR', 'La configuración de la empresa no es válida', details);
  }
  const data = result.data;

  // Todo lo de la marca va junto en un JSON
  const branding = {
    logo: data.logo,
    textos: { titulo: 'Reporte', ...data.textos }, // título por defecto si no envían uno
    ...(data.colores && { colores: data.colores }),
  };

  const slug = slugify(data.name);
  const { id, created } = await companyRepository.saveCompanyWithBranding({ name: data.name, slug, branding });

  return { created, company: { id, name: data.name, slug, branding } };
}

module.exports = { configureCompany };