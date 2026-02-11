#!/usr/bin/env node
/**
 * Pre-build image optimization: resize to max display width, output WebP only.
 * Same approach as minutes-marketing. Reads from public/assets (jpg/png),
 * writes to public/optimized/. Run before `vite build`.
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp'
import { readdir, stat, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const ASSETS_DIR = join(ROOT, 'public', 'assets')
const OUT_DIR = join(ROOT, 'public', 'optimized')
const MAX_WIDTH = 1200

async function collectImages(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const images = []
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      images.push(...(await collectImages(full, rel)))
    } else if (e.isFile() && /\.(jpg|jpeg|png)$/i.test(e.name)) {
      const pathBase = rel.replace(/\//g, '-').replace(/\.[^.]+$/, '')
      images.push({ full, rel, base: `assets-${pathBase}` })
    }
  }
  return images
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true })
}

async function optimizeOne({ full, base }) {
  await ensureDir(OUT_DIR)

  const meta = await sharp(full).metadata()
  const w = meta.width || 0
  const needResize = w > MAX_WIDTH

  const webpPath = join(OUT_DIR, `${base}.webp`)
  let webpPipe = sharp(full)
  if (needResize) webpPipe = webpPipe.resize(MAX_WIDTH, null, { withoutEnlargement: true })
  await webpPipe.webp({ quality: 82 }).toFile(webpPath)

  return { base, webpPath }
}

async function main() {
  const images = await collectImages(ASSETS_DIR)
  console.log(`Optimizing ${images.length} images to public/optimized/ (max width ${MAX_WIDTH}px, WebP only)...`)

  await ensureDir(OUT_DIR)
  const existing = await readdir(OUT_DIR, { withFileTypes: true })
  for (const f of existing) {
    if (f.isFile()) await unlink(join(OUT_DIR, f.name))
  }
  let totalIn = 0
  let totalOut = 0

  for (const img of images) {
    const statIn = await stat(img.full)
    totalIn += statIn.size
    await optimizeOne(img)
  }

  const outFiles = await readdir(OUT_DIR, { withFileTypes: true })
  for (const f of outFiles) {
    if (f.isFile()) {
      const s = await stat(join(OUT_DIR, f.name))
      totalOut += s.size
    }
  }
  console.log(`Done. Total input: ${(totalIn / 1024).toFixed(1)} KB → output: ${(totalOut / 1024).toFixed(1)} KB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
