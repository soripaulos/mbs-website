import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'yqwhfc1k',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Disabled for fresh data - changes reflect immediately
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN, // Optional, only needed for write operations
});

// Initialize image URL builder
const builder = imageUrlBuilder(sanityClient);

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

