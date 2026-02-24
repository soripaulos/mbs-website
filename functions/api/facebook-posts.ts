/**
 * Cloudflare Pages Function: Facebook Posts Proxy
 * 
 * This function fetches posts from Facebook Graph API server-side,
 * avoiding browser tracking protection that blocks client-side requests.
 * 
 * Environment variables required (set in Cloudflare Pages dashboard):
 * - VITE_FB_PAGE_ID: Your Facebook Page ID
 * - VITE_FB_ACCESS_TOKEN: Your Facebook Page Access Token
 */

interface Env {
  VITE_FB_PAGE_ID?: string;
  VITE_FB_ACCESS_TOKEN?: string;
  // Optional, but recommended: the public URL of the Facebook page
  // Example: https://www.facebook.com/p/Makko-Billi-School-100064047512878/
  VITE_FB_PAGE_URL?: string;
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

  // Check for required environment variables (using VITE_ prefix)
  const hasPageId = !!env.VITE_FB_PAGE_ID;
  const hasToken = !!env.VITE_FB_ACCESS_TOKEN;

  if (!hasPageId || !hasToken) {
    // Return detailed error so we know what's missing
    return new Response(
      JSON.stringify({
        error: 'Missing environment variables',
        details: {
          VITE_FB_PAGE_ID: hasPageId ? 'SET' : 'MISSING',
          VITE_FB_ACCESS_TOKEN: hasToken ? 'SET' : 'MISSING',
        },
        help: 'Set VITE_FB_PAGE_ID and VITE_FB_ACCESS_TOKEN in Cloudflare Pages → Settings → Environment Variables',
        posts: [],
      }),
      { status: 200, headers: corsHeaders } // Return 200 so frontend can read the error
    );
  }

  try {
    const FB_GRAPH_URL = 'https://graph.facebook.com/v21.0';
    const fields = [
      'id',
      'message',
      'created_time',
      'permalink_url',
      'full_picture',
      'attachments{media_type,media,subattachments{media}}',
    ].join(',');

    const fetchPosts = async (pageId: string) => {
      const url = `${FB_GRAPH_URL}/${pageId}/posts?fields=${fields}&limit=20&access_token=${env.VITE_FB_ACCESS_TOKEN}`;
      const response = await fetch(url);
      const text = await response.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
      return { ok: response.ok, status: response.status, json };
    };

    const resolvePageIdFromUrl = async (pageUrl: string) => {
      const url = `${FB_GRAPH_URL}/?id=${encodeURIComponent(pageUrl)}&fields=id,name&access_token=${env.VITE_FB_ACCESS_TOKEN}`;
      const response = await fetch(url);
      const text = await response.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
      return { ok: response.ok, status: response.status, json };
    };

    // 1) Try with the configured Page ID
    let attemptPageId = env.VITE_FB_PAGE_ID as string;
    let result = await fetchPosts(attemptPageId);

    // 2) If we get "Unsupported get request" (code 100, subcode 33),
    // try resolving the real Graph Page ID from the page URL and retry.
    const fbErr = result?.json?.error;
    const isUnsupportedGetRequest =
      fbErr && fbErr.code === 100 && (fbErr.error_subcode === 33 || fbErr.error_subcode === 0 || fbErr.error_subcode == null);
    const isTokenError =
      fbErr && (fbErr.code === 190 || fbErr.code === 102);

    let resolvedPage: { id?: string; name?: string } | null = null;

    if (!result.ok && isTokenError) {
      return new Response(
        JSON.stringify({
          error: `Facebook token error (code ${fbErr.code})`,
          facebookError: result.json,
          hint: 'Your access token is invalid or expired. Generate a new Page Access Token in Graph API Explorer → /me/accounts.',
          posts: [],
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    if (!result.ok && isUnsupportedGetRequest && env.VITE_FB_PAGE_URL) {
      const resolved = await resolvePageIdFromUrl(env.VITE_FB_PAGE_URL);
      const resolvedId = resolved?.json?.id;
      if (resolved.ok && resolvedId) {
        resolvedPage = { id: resolvedId, name: resolved?.json?.name };
        attemptPageId = resolvedId;
        result = await fetchPosts(attemptPageId);
      } else {
        return new Response(
          JSON.stringify({
            error: `Facebook API HTTP error: ${result.status}`,
            facebookError: result.json,
            hint: 'Your VITE_FB_PAGE_ID might not be the real Graph Page ID. Set VITE_FB_PAGE_URL and redeploy.',
            resolveAttempt: resolved.json,
            posts: [],
          }),
          { status: 200, headers: corsHeaders }
        );
      }
    }

    if (!result.ok) {
      return new Response(
        JSON.stringify({
          error: `Facebook API HTTP error: ${result.status}`,
          facebookError: result.json,
          attemptedPageId: attemptPageId,
          resolvedPage,
          hint:
            'This usually means your token is not a valid Page Access Token for this Page, or the Page ID is wrong. Use /me/accounts in Graph API Explorer to get the correct Page ID + Page token.',
          posts: [],
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const data = result.json as { data?: FacebookPost[]; error?: any };

    if (data.error) {
      return new Response(
        JSON.stringify({
          error: 'Facebook API error',
          facebookError: {
            message: data.error.message,
            type: data.error.type,
            code: data.error.code,
            error_subcode: data.error.error_subcode,
            fbtrace_id: data.error.fbtrace_id,
          },
          attemptedPageId: attemptPageId,
          resolvedPage,
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
        attemptedPageId: attemptPageId,
        resolvedPage,
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
