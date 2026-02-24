import { SocialPost } from '../types';

/**
 * Fetch Facebook posts via server-side proxy (Cloudflare Pages Function).
 * Returns an empty array on failure — no static placeholder data.
 */
export const fetchFacebookPosts = async (): Promise<SocialPost[]> => {
  try {
    const response = await fetch('/api/facebook-posts');

    let data: any;
    try {
      data = await response.json();
    } catch {
      return [];
    }

    if (data.error) {
      console.warn('[FB] Proxy error:', data.error);
      return [];
    }

    if (!data.posts || data.posts.length === 0) {
      return [];
    }

    return data.posts;
  } catch (error) {
    console.warn('[FB] Fetch error:', error);
    return [];
  }
};
