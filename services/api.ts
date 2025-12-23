
import { SocialPost, GalleryImage } from '../types';
import { FALLBACK_FACEBOOK_POSTS, FALLBACK_GALLERY_IMAGES } from '../constants';

const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0';
const PAGE_ID = import.meta.env.VITE_FB_PAGE_ID as string | undefined;
const FB_ACCESS_TOKEN = import.meta.env.VITE_FB_ACCESS_TOKEN as string | undefined;

export const fetchFacebookPosts = async (): Promise<SocialPost[]> => {
  try {
    // If not configured, fall back instead of hard failing
    if (!PAGE_ID || !FB_ACCESS_TOKEN) {
      console.warn('Missing VITE_FB_PAGE_ID / VITE_FB_ACCESS_TOKEN. Using fallback Facebook posts.');
      return FALLBACK_FACEBOOK_POSTS;
    }

    // NOTE: Do not log the full URL, it contains the token.
    const url =
      `${FB_GRAPH_URL}/${PAGE_ID}/posts` +
      `?fields=id,message,created_time,permalink_url,full_picture,` +
      // Try to capture albums/carousels + single images in one request
      `attachments{media_type,media{source,image},subattachments{media{source,image}}}` +
      `&limit=10&access_token=${FB_ACCESS_TOKEN}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Facebook API error:', response.status, response.statusText);
      throw new Error(`FB_API_${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('Facebook API returned error:', data.error);
      return FALLBACK_FACEBOOK_POSTS;
    }
    
    if (!data.data || data.data.length === 0) {
      return FALLBACK_FACEBOOK_POSTS;
    }

    const mappedPosts: SocialPost[] = data.data.map((post: any) => {
        let images: string[] = [];

        // 1. Check for Album (multiple images)
        const subattachments = post?.attachments?.data?.[0]?.subattachments?.data;
        if (Array.isArray(subattachments) && subattachments.length > 0) {
           images = subattachments
             .map((sub: any) => sub?.media?.image?.src || sub?.media?.source)
             .filter(Boolean);
        } 
        // 2. Check for Single Media
        else {
          const media = post?.attachments?.data?.[0]?.media;
          const single = media?.image?.src || media?.source;
          if (single) images = [single];
        }
        // 3. Check for Full Picture
        if (images.length === 0 && post?.full_picture) {
          images = [post.full_picture];
        }

        return {
          id: post.id,
          content: post.message || '',
          images: images,
          date: new Date(post.created_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          url: post.permalink_url
        };
      });

    return mappedPosts;

  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return FALLBACK_FACEBOOK_POSTS;
  }
};

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    if (!PAGE_ID || !FB_ACCESS_TOKEN) {
      return FALLBACK_GALLERY_IMAGES;
    }
    // Similar strategy: try to fetch, but fallback aggressively if empty
    const accountRes = await fetch(
      `${FB_GRAPH_URL}/${PAGE_ID}?fields=instagram_business_account&access_token=${FB_ACCESS_TOKEN}`
    );
    
    if (!accountRes.ok) throw new Error("IG_FAIL");
    const accountData = await accountRes.json();
    const instagramId = accountData.instagram_business_account?.id;

    if (instagramId) {
      const mediaRes = await fetch(
        `${FB_GRAPH_URL}/${instagramId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=${FB_ACCESS_TOKEN}`
      );
      if (!mediaRes.ok) throw new Error("MEDIA_FAIL");
      const mediaData = await mediaRes.json();
      
      const mapped = mediaData.data
        .filter((item: any) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
        .map((item: any) => ({
          id: item.id,
          url: item.media_url,
          caption: item.caption || 'Instagram Photo'
        }));
        
      if (mapped.length === 0) return FALLBACK_GALLERY_IMAGES;
      return mapped;
    } else {
      // Facebook Photos Fallback
      const photosRes = await fetch(
        `${FB_GRAPH_URL}/${PAGE_ID}/photos?type=uploaded&fields=id,picture,source,name&limit=12&access_token=${FB_ACCESS_TOKEN}`
      );
      if (!photosRes.ok) throw new Error("FB_PHOTO_FAIL");
      const photosData = await photosRes.json();
      
      if (!photosData.data || photosData.data.length === 0) return FALLBACK_GALLERY_IMAGES;

      return photosData.data.map((photo: any) => ({
        id: photo.id,
        url: photo.source,
        caption: photo.name || 'Gallery Photo'
      }));
    }
  } catch (error) {
    return FALLBACK_GALLERY_IMAGES;
  }
};
