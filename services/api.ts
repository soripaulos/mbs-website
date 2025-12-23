import { SocialPost, GalleryImage } from '../types';
import { FALLBACK_FACEBOOK_POSTS, FALLBACK_GALLERY_IMAGES } from '../constants';

/**
 * Fetch Facebook posts via server-side proxy.
 * 
 * This calls our Cloudflare Pages Function at /api/facebook-posts,
 * which fetches from Facebook Graph API server-side.
 * 
 * This avoids browser tracking protection that blocks client-side
 * requests to graph.facebook.com.
 */
export const fetchFacebookPosts = async (): Promise<SocialPost[]> => {
  try {
    console.log('[FB] Fetching posts via server proxy...');

    // Call our Cloudflare Pages Function
    const response = await fetch('/api/facebook-posts');

    if (!response.ok) {
      console.error('[FB] Proxy returned error:', response.status, response.statusText);
      return FALLBACK_FACEBOOK_POSTS;
    }

    const data = await response.json();

    // Check for error in response
    if (data.error) {
      console.error('[FB] Proxy error:', data.error);
      if (data.errorType) console.error('[FB] Error type:', data.errorType);
      if (data.errorCode) console.error('[FB] Error code:', data.errorCode);
      return FALLBACK_FACEBOOK_POSTS;
    }

    // Check for posts
    if (!data.posts || data.posts.length === 0) {
      console.warn('[FB] No posts returned from proxy. Using fallback.');
      return FALLBACK_FACEBOOK_POSTS;
    }

    console.log('[FB] Received', data.posts.length, 'posts from proxy');
    return data.posts;

  } catch (error) {
    console.error('[FB] Fetch error:', error);
    return FALLBACK_FACEBOOK_POSTS;
  }
};

/**
 * Fetch gallery images.
 * For now, returns fallback images.
 * Can be extended to use a similar proxy pattern if needed.
 */
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  // For gallery, we'll use fallback for now
  // If you want live gallery from Facebook/Instagram, we can add another proxy
  return FALLBACK_GALLERY_IMAGES;
};
