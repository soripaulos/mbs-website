import { SocialPost, GalleryImage } from '../types';
import { FALLBACK_FACEBOOK_POSTS, FALLBACK_GALLERY_IMAGES } from '../constants';

// Facebook Graph API configuration
const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0';

// Read from environment variables (set in Cloudflare Pages)
const PAGE_ID = import.meta.env.VITE_FB_PAGE_ID as string | undefined;
const FB_ACCESS_TOKEN = import.meta.env.VITE_FB_ACCESS_TOKEN as string | undefined;

/**
 * Fetch posts from a Facebook Page.
 * Returns real posts if env vars are configured and API succeeds.
 * Falls back to static posts otherwise.
 */
export const fetchFacebookPosts = async (): Promise<SocialPost[]> => {
  // Debug: Log environment variable status (not the actual values)
  console.log('[FB] Environment check:', {
    hasPageId: !!PAGE_ID,
    hasAccessToken: !!FB_ACCESS_TOKEN,
    pageIdLength: PAGE_ID?.length || 0,
    tokenLength: FB_ACCESS_TOKEN?.length || 0,
  });

  // If env vars are missing, use fallback immediately
  if (!PAGE_ID || !FB_ACCESS_TOKEN) {
    console.warn('[FB] Missing VITE_FB_PAGE_ID or VITE_FB_ACCESS_TOKEN. Using fallback posts.');
    console.warn('[FB] Set these in Cloudflare Pages → Settings → Environment Variables');
    return FALLBACK_FACEBOOK_POSTS;
  }

  try {
    // Build the Graph API URL
    // Request: posts with message, date, link, images (including albums/carousels)
    const fields = [
      'id',
      'message',
      'created_time',
      'permalink_url',
      'full_picture',
      'attachments{media_type,media,subattachments{media}}'
    ].join(',');

    const url = `${FB_GRAPH_URL}/${PAGE_ID}/posts?fields=${fields}&limit=20&access_token=${FB_ACCESS_TOKEN}`;

    console.log('[FB] Fetching posts from Facebook Graph API...');
    const response = await fetch(url);

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[FB] API HTTP error:', response.status, response.statusText);
      console.error('[FB] Response body:', errorText);
      return FALLBACK_FACEBOOK_POSTS;
    }

    const data = await response.json();

    // Handle API-level errors (e.g., invalid token, permissions)
    if (data.error) {
      console.error('[FB] API returned error:', data.error);
      console.error('[FB] Error type:', data.error.type);
      console.error('[FB] Error message:', data.error.message);
      console.error('[FB] Error code:', data.error.code);
      return FALLBACK_FACEBOOK_POSTS;
    }

    // Handle empty response
    if (!data.data || data.data.length === 0) {
      console.warn('[FB] No posts returned from API. Using fallback.');
      return FALLBACK_FACEBOOK_POSTS;
    }

    console.log('[FB] Received', data.data.length, 'posts from Facebook');

    // Map Facebook posts to our SocialPost format
    const mappedPosts: SocialPost[] = data.data.map((post: any) => {
      let images: string[] = [];

      // Try to extract images in order of preference:

      // 1. Album/carousel: subattachments contain multiple images
      const subattachments = post?.attachments?.data?.[0]?.subattachments?.data;
      if (Array.isArray(subattachments) && subattachments.length > 0) {
        images = subattachments
          .map((sub: any) => {
            // Try different paths where the image URL might be
            return sub?.media?.image?.src 
              || sub?.media?.source 
              || sub?.media?.image?.uri
              || null;
          })
          .filter(Boolean);
      }

      // 2. Single attachment media
      if (images.length === 0) {
        const media = post?.attachments?.data?.[0]?.media;
        const singleImage = media?.image?.src || media?.source || media?.image?.uri;
        if (singleImage) {
          images = [singleImage];
        }
      }

      // 3. full_picture (lower resolution fallback)
      if (images.length === 0 && post?.full_picture) {
        images = [post.full_picture];
      }

      // Format date
      const dateStr = post.created_time
        ? new Date(post.created_time).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Recent';

      return {
        id: post.id,
        content: post.message || '',
        images,
        date: dateStr,
        url: post.permalink_url || '#',
      };
    });

    // Filter out posts with no content and no images
    const validPosts = mappedPosts.filter(p => p.content || p.images.length > 0);
    
    console.log('[FB] Mapped', validPosts.length, 'valid posts');
    
    if (validPosts.length === 0) {
      console.warn('[FB] All posts were empty. Using fallback.');
      return FALLBACK_FACEBOOK_POSTS;
    }

    return validPosts;

  } catch (error) {
    console.error('[FB] Fetch error:', error);
    return FALLBACK_FACEBOOK_POSTS;
  }
};

/**
 * Fetch gallery images from Instagram (via Facebook) or Facebook Photos.
 * Falls back to static images if API fails.
 */
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  if (!PAGE_ID || !FB_ACCESS_TOKEN) {
    console.warn('[Gallery] Missing env vars. Using fallback images.');
    return FALLBACK_GALLERY_IMAGES;
  }

  try {
    // First, check if the Page has a linked Instagram Business Account
    const accountRes = await fetch(
      `${FB_GRAPH_URL}/${PAGE_ID}?fields=instagram_business_account&access_token=${FB_ACCESS_TOKEN}`
    );

    if (!accountRes.ok) {
      throw new Error('Failed to fetch Instagram account info');
    }

    const accountData = await accountRes.json();
    const instagramId = accountData?.instagram_business_account?.id;

    if (instagramId) {
      // Fetch Instagram media
      const mediaRes = await fetch(
        `${FB_GRAPH_URL}/${instagramId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=${FB_ACCESS_TOKEN}`
      );

      if (!mediaRes.ok) {
        throw new Error('Failed to fetch Instagram media');
      }

      const mediaData = await mediaRes.json();

      const mapped = (mediaData.data || [])
        .filter((item: any) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
        .map((item: any) => ({
          id: item.id,
          url: item.media_url || item.thumbnail_url,
          caption: item.caption || 'Photo',
        }));

      if (mapped.length > 0) {
        return mapped;
      }
    }

    // Fallback: Fetch Facebook Page photos
    const photosRes = await fetch(
      `${FB_GRAPH_URL}/${PAGE_ID}/photos?type=uploaded&fields=id,picture,source,name&limit=12&access_token=${FB_ACCESS_TOKEN}`
    );

    if (!photosRes.ok) {
      throw new Error('Failed to fetch Facebook photos');
    }

    const photosData = await photosRes.json();

    if (!photosData.data || photosData.data.length === 0) {
      return FALLBACK_GALLERY_IMAGES;
    }

    return photosData.data.map((photo: any) => ({
      id: photo.id,
      url: photo.source || photo.picture,
      caption: photo.name || 'Gallery Photo',
    }));

  } catch (error) {
    console.error('[Gallery] Fetch error:', error);
    return FALLBACK_GALLERY_IMAGES;
  }
};
