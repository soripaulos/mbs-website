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
  FB_PAGE_ID?: string;
  FB_ACCESS_TOKEN?: string;
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
  const hasPageId = !!env.FB_PAGE_ID;
  const hasToken = !!env.FB_ACCESS_TOKEN;

  if (!hasPageId || !hasToken) {
    // Return detailed error so we know what's missing
    return new Response(
      JSON.stringify({
        error: 'Missing environment variables',
        details: {
          FB_PAGE_ID: hasPageId ? 'SET' : 'MISSING',
          FB_ACCESS_TOKEN: hasToken ? 'SET' : 'MISSING',
        },
        help: 'Set FB_PAGE_ID and FB_ACCESS_TOKEN in Cloudflare Pages → Settings → Environment Variables',
        posts: [],
      }),
      { status: 200, headers: corsHeaders } // Return 200 so frontend can read the error
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

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        errorJson = { raw: errorText };
      }
      
      return new Response(
        JSON.stringify({
          error: `Facebook API HTTP error: ${response.status}`,
          facebookError: errorJson,
          posts: [],
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const data = await response.json() as { data?: FacebookPost[]; error?: any };

    if (data.error) {
      return new Response(
        JSON.stringify({
          error: 'Facebook API error',
          facebookError: {
            message: data.error.message,
            type: data.error.type,
            code: data.error.code,
            fbtrace_id: data.error.fbtrace_id,
          },
          posts: [],
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    if (!data.data || data.data.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No posts found on this Facebook page',
          posts: [] 
        }),
        { status: 200, headers: corsHeaders }
      );
    }

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

    return new Response(
      JSON.stringify({ 
        success: true,
        count: validPosts.length,
        posts: validPosts 
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        posts: [],
      }),
      { status: 200, headers: corsHeaders }
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
