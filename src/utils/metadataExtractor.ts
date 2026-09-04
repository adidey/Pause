/**
 * Product URL Metadata Extractor & Fallback Image Pipeline for PAUSE
 * Safely parses product metadata from URLs or CORS proxies and provides graceful fallbacks.
 */

export interface ProductMetadata {
  title?: string
  price?: number
  image?: string
  brand?: string
  retailer?: string
}

/**
 * Attempts to extract product metadata (og:image, twitter:image, title, price, brand) from a URL.
 */
export async function fetchProductMetadata(urlStr: string): Promise<ProductMetadata> {
  const result: ProductMetadata = {}
  
  if (!urlStr || !urlStr.trim()) return result

  let cleanUrl = urlStr.trim()
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl
  }

  try {
    const parsed = new URL(cleanUrl)
    // Extract retailer domain name as default retailer/brand
    const hostname = parsed.hostname.replace(/^www\./, "")
    result.retailer = hostname.split(".")[0]?.toUpperCase() || hostname

    // Infer title from URL path slug if needed
    const pathSegments = parsed.pathname.split("/").filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1] || ""
    if (lastSegment) {
      const slugTitle = lastSegment
        .replace(/[-_]/g, " ")
        .replace(/\.(html?|php|asp)$/i, "")
        .replace(/\b\w/g, (c) => c.toUpperCase())
      if (slugTitle.length > 3 && !/^\d+$/.test(slugTitle)) {
        result.title = slugTitle
      }
    }

    // Try fetching HTML via CORS proxy for metadata extraction
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3500) // 3.5s timeout

    const res = await fetch(proxyUrl, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (res.ok) {
      const data = await res.json()
      const html = data.contents || ""

      if (html) {
        // 1. og:image
        const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                           html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i)
        if (ogImgMatch?.[1]) result.image = ogImgMatch[1]

        // 2. twitter:image fallback
        if (!result.image) {
          const twImgMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i) ||
                             html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i)
          if (twImgMatch?.[1]) result.image = twImgMatch[1]
        }

        // 3. Title extraction
        const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                             html.match(/<title>([^<]+)<\/title>/i)
        if (ogTitleMatch?.[1]) {
          result.title = ogTitleMatch[1].trim()
        }

        // 4. Price extraction
        const priceMatch = html.match(/<meta\s+property=["']og:price:amount["']\s+content=["']([^"']+)["']/i) ||
                           html.match(/["']price["']\s*:\s*["']?([\d.]+)/i)
        if (priceMatch?.[1]) {
          const val = parseFloat(priceMatch[1])
          if (!isNaN(val) && val > 0) result.price = val
        }
      }
    }
  } catch (err) {
    // Graceful fallback on network timeout or CORS issue
  }

  return result
}
