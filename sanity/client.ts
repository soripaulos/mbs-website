import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'yqwhfc1k',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper to get image URL with optional transformations
export function getImageUrl(
  source: any,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  let urlBuilder = builder.image(source);
  
  if (width) {
    urlBuilder = urlBuilder.width(width);
  }
  
  if (height) {
    urlBuilder = urlBuilder.height(height);
  }
  
  return urlBuilder.quality(quality).url();
}

