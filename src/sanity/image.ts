/**
 * Sanity image helpers — single source of truth for image optimization.
 *
 * Per Sanity docs (https://www.sanity.io/docs/apis-and-sdks/image-urls):
 *   - `?w=`, `?h=` — width / height
 *   - `?fit=max` — never upscale a smaller image
 *   - `?q=N` — quality 0-100 (default 75 for JPG/WebP, 55 for AVIF)
 *   - `?auto=format` — returns the most optimized format based on the
 *     browser's Accept header. This is the **preferred** way per the docs.
 *     The CDN serves AVIF → WebP → original format depending on support.
 *   - `?fm=webp` / `?fm=jpg` — explicit format for non-browser contexts
 *     (e.g. server-side, email, OG images).
 *
 * The CDN reads the browser's `Accept` header. If we use `auto=format`,
 * supporting browsers get AVIF/WebP automatically; older browsers get the
 * original format (PNG stays PNG, JPEG stays JPEG). That is the intended
 * fallback behavior — there is no `auto=format&fallback=jpg` parameter
 * (confirmed via Sanity answers 2025-11-29).
 *
 * This module uses `@sanity/image-url` (the recommended builder) so we
 * get type-safety, hotspot/crop support, and srcset generation.
 */

import { urlFor as rawUrlFor } from './client';

// Preset width/quality profiles per use case.
// Tweak these in one place if you want to retune the whole site.
export const IMAGE_PRESETS = {
  hero:          { width: 1920, quality: 75, fit: 'max' as const },
  sectionBg:     { width: 1600, quality: 75, fit: 'max' as const },
  gallery:       { width:  800, quality: 75, fit: 'max' as const },
  lightbox:      { width: 1920, quality: 85, fit: 'max' as const },
  staffAvatar:   { width:  200, quality: 80, fit: 'crop' as const },
  socialPost:    { width:  600, quality: 75, fit: 'max' as const },
  appScreenshot: { width:  800, quality: 80, fit: 'max' as const },
  logo:          { width:  200, quality: 90, fit: 'max' as const },
  branch:        { width:  800, quality: 75, fit: 'max' as const },
  facility:      { width: 1200, quality: 75, fit: 'max' as const },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

/**
 * Build a Sanity CDN URL from a Sanity image reference (asset object, not a
 * pre-resolved URL string). Use this for all new code paths.
 *
 *   urlForImage(staff.image, 'staffAvatar') // → "...?w=200&q=80&fit=crop&auto=format"
 */
export function urlForImage(
  source: unknown,
  preset: ImagePreset = 'gallery',
): string {
  if (!source) return '';
  const cfg = IMAGE_PRESETS[preset];
  return rawUrlFor(source)
    .width(cfg.width)
    .quality(cfg.quality)
    .fit(cfg.fit)
    .auto('format') // preferred per Sanity docs; uses Accept header
    .url();
}

/**
 * Take a raw Sanity CDN URL string (as returned by `asset->url` in GROQ)
 * and append the optimization params. This is the path used by
 * `services/sanity.ts` when we don't have the full asset reference.
 *
 * Note: we pass a PRESET, not a raw width, so all call sites use a
 * consistent size map. To add a new use case, add it to IMAGE_PRESETS.
 */
export function optimizeImageUrl(
  url: string | undefined | null,
  preset: ImagePreset = 'gallery',
): string | undefined | null {
  if (!url) return url;
  if (!url.includes('cdn.sanity.io')) return url;
  const cfg = IMAGE_PRESETS[preset];
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}w=${cfg.width}&q=${cfg.quality}&fit=${cfg.fit}&auto=format`;
}

export function optimizeImageUrls(
  urls: (string | undefined | null)[] | undefined | null,
  preset: ImagePreset = 'gallery',
): string[] {
  if (!urls) return [];
  return urls.filter(Boolean).map((u) => optimizeImageUrl(u, preset)) as string[];
}

/**
 * Build a srcset string for responsive images.
 * Returns 3 sizes (1x, 2x, 3x) for the given preset width.
 *
 *   srcSetFor(post.images[0], 'socialPost') // → "url?w=600 ... 600w, url?w=1200 ... 1200w, ..."
 */
export function srcSetFor(
  source: unknown,
  preset: ImagePreset = 'gallery',
): string | undefined {
  if (!source) return undefined;
  const cfg = IMAGE_PRESETS[preset];
  const w = cfg.width;
  return [1, 2, 3]
    .map((dpr) => `${rawUrlFor(source).width(w * dpr).quality(cfg.quality).fit(cfg.fit).auto('format').url()} ${w * dpr}w`)
    .join(', ');
}

/**
 * Apply a preset to every URL in a nested object, by dot-path.
 * Use this when a fetcher returns a complex shape with image URLs scattered
 * throughout — e.g. `applyPresetDeep(data, ['hero.images', 'gallery'], 'gallery')`.
 *
 * Path entries ending in `[]` mean "every element of this array"; bare keys
 * mean "this scalar field". Keeps call sites readable.
 */
export function applyPresetToPaths(
  obj: any,
  paths: string[],
  preset: ImagePreset,
): void {
  if (!obj) return;
  for (const path of paths) {
    const isArray = path.endsWith('[]');
    const cleanPath = isArray ? path.slice(0, -2) : path;
    const segs = cleanPath.split('.');
    let cur = obj;
    for (let i = 0; i < segs.length - 1; i++) {
      if (cur == null) break;
      cur = cur[segs[i]];
    }
    if (cur == null) continue;
    const leaf = segs[segs.length - 1];
    if (isArray) {
      const arr = cur[leaf];
      if (Array.isArray(arr)) {
        cur[leaf] = arr.map((u: any) => optimizeImageUrl(u, preset));
      }
    } else {
      cur[leaf] = optimizeImageUrl(cur[leaf], preset);
    }
  }
}
