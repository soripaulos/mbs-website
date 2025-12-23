/**
 * Cloudflare Pages Function: Facebook Posts Proxy
 * 
 * This function fetches posts from Facebook Graph API server-side,
 * avoiding browser tracking protection that blocks client-side requests.
 * 
 * Environment variables required (set in Cloudflare Pages dashboard):
 * - FB_PAGE_ID: Your Facebook Page ID
 * - FB_ACCESS_TOKEN: Your Facebook Page Access Token
 */

interface Env {
  FB_PAGE_ID: string;
  FB_ACCESS_TOKEN: string;
}

interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  full_picture?: string;
  attachments?: {
    data?: Array<{
      media?: {
        image?: { src?: string };
        source?: string;
      };
      subattachments?: {
        data?: Array<{
          media?: {
            image?: { src?: string };
            source?: string;
          };
        }>;
      };
    }>;
  };
}

interface SocialPost {
  id: string;
  content: string;
  images: string[];
  date: string;
  url: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // CORS headers for the response
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Check for required environment variables
  if (!env.FB_PAGE_ID || !env.FB_ACCESS_TOKEN) {
    console.error('[FB Proxy] Missing FB_PAGE_ID or FB_ACCESS_TOKEN');
    return new Response(
      JSON.stringify({
        error: 'Server configuration error',
        posts: [],
      }),
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0';
    const fields = [
      'id',
      'message',
      'created_time',
      'permalink_url',
      'full_picture',
      'attachments{media_type,media,subattachments{media}}',
    ].join(',');

    const url = `${FB_GRAPH_URL}/${env.FB_PAGE_ID}/posts?fields=${fields}&limit=20&access_token=${env.FB_ACCESS_TOKEN}`;

    console.log('[FB Proxy] Fetching from Facebook Graph API...');
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[FB Proxy] Facebook API error:', response.status, errorText);
      return new Response(
        JSON.stringify({
          error: `Facebook API error: ${response.status}`,
          posts: [],
        }),
        { status: 502, headers: corsHeaders }
      );
    }

    const data = await response.json() as { data?: FacebookPost[]; error?: any };

    if (data.error) {
      console.error('[FB Proxy] Facebook API returned error:', data.error);
      return new Response(
        JSON.stringify({
          error: data.error.message || 'Facebook API error',
          errorType: data.error.type,
          errorCode: data.error.code,
          posts: [],
        }),
        { status: 502, headers: corsHeaders }
      );
    }

    if (!data.data || data.data.length === 0) {
      console.log('[FB Proxy] No posts returned from Facebook');
      return new Response(
        JSON.stringify({ posts: [] }),
        { status: 200, headers: corsHeaders }
      );
    }

    console.log('[FB Proxy] Received', data.data.length, 'posts');

    // Map Facebook posts to our format
    const posts: SocialPost[] = data.data.map((post: FacebookPost) => {
      let images: string[] = [];

      // 1. Check for album/carousel (subattachments)
      const subattachments = post?.attachments?.data?.[0]?.subattachments?.data;
      if (Array.isArray(subattachments) && subattachments.length > 0) {
        images = subattachments
          .map((sub) => sub?.media?.image?.src || sub?.media?.source)
          .filter((url): url is string => !!url);
      }

      // 2. Check for single media
      if (images.length === 0) {
        const media = post?.attachments?.data?.[0]?.media;
        const singleImage = media?.image?.src || media?.source;
        if (singleImage) {
          images = [singleImage];
        }
      }

      // 3. Fallback to full_picture
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

    // Filter out empty posts
    const validPosts = posts.filter((p) => p.content || p.images.length > 0);

    console.log('[FB Proxy] Returning', validPosts.length, 'valid posts');

    return new Response(
      JSON.stringify({ posts: validPosts }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('[FB Proxy] Fetch error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch posts',
        posts: [],
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

