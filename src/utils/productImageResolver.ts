import { fetchProductMetadata, ProductMetadata } from "./metadataExtractor"

export type ImageSourceType = "og" | "twitter" | "schema" | "direct" | "fallback"

export interface ProductImageResult {
  url?: string
  source: ImageSourceType
}

// In-memory cache to prevent duplicate scraping network calls
const imageCache = new Map<string, ProductImageResult>()

/**
 * ProductImageResolver
 * Resolves a product image for any given Want item or URL.
 */
export async function resolveProductImage(urlOrNote?: string): Promise<ProductImageResult> {
  if (!urlOrNote || !urlOrNote.trim()) {
    return { source: "fallback" }
  }

  const clean = urlOrNote.trim()

  // 1. Check cache first
  if (imageCache.has(clean)) {
    return imageCache.get(clean)!
  }

  // 2. Direct image asset URL check (e.g. data URI, local blob, direct image link)
  if (
    clean.startsWith("data:") ||
    clean.startsWith("blob:") ||
    clean.startsWith("/") ||
    clean.startsWith("file:") ||
    /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(clean)
  ) {
    const res: ProductImageResult = { url: clean, source: "direct" }
    imageCache.set(clean, res)
    return res
  }

  // 3. Attempt network metadata extraction for product links
  try {
    const meta: ProductMetadata = await fetchProductMetadata(clean)
    if (meta.image) {
      const res: ProductImageResult = { url: meta.image, source: "og" }
      imageCache.set(clean, res)
      return res
    }
  } catch {
    // Fail silently and use fallback artwork
  }

  const fallbackRes: ProductImageResult = { source: "fallback" }
  imageCache.set(clean, fallbackRes)
  return fallbackRes
}
