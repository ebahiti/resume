/**
 * Generates sitemap.xml into dist/ after vite build.
 * Routes are defined here; add any new public routes to SITE_ROUTES.
 * Run from repo root: node scripts/generate-sitemap.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const BASE_URL = 'https://elinorbahiti.ca';
const SITE_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/credentials', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
];

const lastmod = new Date().toISOString().split('T')[0];

const urlEntries = SITE_ROUTES.map(({ path: p, changefreq, priority }) => `
  <url>
    <loc>${BASE_URL}${p === '/' ? '' : p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run npm run build first.');
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap.trim(), 'utf8');
console.log('Wrote dist/sitemap.xml');
