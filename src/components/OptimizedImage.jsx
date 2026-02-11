/**
 * Uses pre-built WebP from /optimized/ when the source is a raster we optimize.
 * Run `node scripts/optimize-images.mjs` before build.
 * For /assets/... .jpg|.png we serve WebP from /optimized/assets-<path>.webp.
 */
const OPT_BASE = '/optimized'

function getOptimizedBase(src) {
  if (!src || typeof src !== 'string') return null
  const match = src.match(/^\/assets\/(.+)\.(jpg|jpeg|png)$/i)
  if (!match) return null
  const pathPart = match[1].replace(/\//g, '-')
  return `assets-${pathPart}`
}

export function OptimizedImage({ src, alt, className, width, height, loading, decoding, ...rest }) {
  const base = getOptimizedBase(src)
  if (!base) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...rest}
      />
    )
  }
  return (
    <picture>
      <source type="image/webp" srcSet={`${OPT_BASE}/${base}.webp`} />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...rest}
      />
    </picture>
  )
}
