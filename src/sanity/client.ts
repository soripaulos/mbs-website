import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'yqwhfc1k',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Re-enabled CDN for optimized image and query loading
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
