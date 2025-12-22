
import { SocialPost, GalleryImage } from '../types';
import { FALLBACK_FACEBOOK_POSTS, FALLBACK_GALLERY_IMAGES } from '../constants';

const FB_ACCESS_TOKEN = 'EAAG88PhMfCsBP3pduhYqoyX6lIadrudtWOMqYFoqAHS69DTZCEZB7fk3aUTrfMQE1y6NeMrQUTYWpwoKRxL6vNNBMYbGi3OFP1mPlzNu7edgZAvAm0XlOHPJZAJO30LMJmZBZBoogkkNc2jych5kPKwUOk7y02dHhcAZAnZBE3wsCPKMWmkbGzjjQvF5iATVHdSQ0JXuJKyMjdqQjE0bKOonRkX2mZCpO78fFxgZDZD';
const PAGE_ID = '489218120645675'; 
const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0';

export const fetchFacebookPosts = async (): Promise<SocialPost[]> => {
  try {
    const url = `${FB_GRAPH_URL}/${PAGE_ID}/posts?fields=id,message,created_time,permalink_url,full_picture,attachments{media_type,media,subattachments}&limit=10&access_token=${FB_ACCESS_TOKEN}`;
    console.log('Fetching Facebook posts from:', url);
    
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Facebook API error:', response.status, response.statusText);
      throw new Error('API_FAIL');
    }

    const data = await response.json();
    console.log('Facebook API response:', data);
    
    if (data.error) {
      console.error('Facebook API returned error:', data.error);
      return FALLBACK_FACEBOOK_POSTS;
    }
    
    if (!data.data || data.data.length === 0) {
      console.log('No posts returned from Facebook API, using fallback');
      return FALLBACK_FACEBOOK_POSTS;
    }

    const mappedPosts = data.data.map((post: any) => {
        let images: string[] = [];

        // 1. Check for Album (multiple images)
        if (post.attachments?.data?.[0]?.subattachments?.data) {
           images = post.attachments.data[0].subattachments.data.map((sub: any) => sub.media?.image?.src).filter(Boolean);
        } 
        // 2. Check for Single Media
        else if (post.attachments?.data?.[0]?.media?.image?.src) {
           images = [post.attachments.data[0].media.image.src];
        }
        // 3. Check for Full Picture
        else if (post.full_picture) {
           images = [post.full_picture];
        }

        console.log(`Post ${post.id}: ${images.length} images found`);

        return {
          id: post.id,
          content: post.message || '',
          images: images,
          date: new Date(post.created_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          url: post.permalink_url
        };
      });

    console.log('Returning', mappedPosts.length, 'posts from Facebook API');
    return mappedPosts;

  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return FALLBACK_FACEBOOK_POSTS;
  }
};

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
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
