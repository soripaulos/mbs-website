const BASE_URL = (import.meta.env.VITE_FRAPPE_BASE_URL || 'https://app.makkobillischool.com').replace(/\/$/, '');

async function frappeGet(doctype: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`${BASE_URL}/api/resource/${encodeURIComponent(doctype)}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Frappe request failed (${res.status}): ${doctype}`);
  }

  const json = await res.json();
  return json.data;
}

async function frappeGetByName(doctype: string, name: string): Promise<any> {
  const url = `${BASE_URL}/api/resource/${encodeURIComponent(doctype)}/${encodeURIComponent(name)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Frappe request failed (${res.status}): ${doctype}/${name}`);
  }
  const json = await res.json();
  return json.data;
}

// These "page" doctypes are modeled as singletons (exactly one record each) but
// are NOT true Frappe Single DocTypes — Frappe Cloud's Custom DocType mechanism
// silently ignores is_single on doctypes created without developer mode. Frappe's
// generic list endpoint (frappe.client.get_list) never returns Table/child-table
// field data, so a plain list fetch would come back with every hero image,
// feature list, etc. missing. Fetching the one record by name uses get_doc
// instead, which does include child tables.
export async function getSingle<T = any>(doctype: string): Promise<T | null> {
  try {
    const list = await frappeGet(doctype, { fields: '["name"]', limit_page_length: '1' });
    const name = Array.isArray(list) ? list[0]?.name : undefined;
    if (!name) return null;
    const data = await frappeGetByName(doctype, name);
    return data ?? null;
  } catch (error) {
    console.error(`[Frappe] Error fetching single "${doctype}":`, error);
    return null;
  }
}

// Sort an array of records client-side by an "order_by" expression like
// "order asc" or "date desc". Sorting is done here rather than via the REST
// API's order_by param on purpose: several of our fields are named `order`,
// which is a SQL reserved word Frappe does NOT backtick in its ORDER BY
// clause, so a server-side sort throws a syntax error and the whole fetch
// fails. Sorting in JS sidesteps that entirely and is safe for any field name.
function sortRows<T = any>(rows: T[], orderBy?: string): T[] {
  if (!orderBy) return rows;
  const [field, dir] = orderBy.trim().split(/\s+/);
  const desc = (dir || 'asc').toLowerCase() === 'desc';
  return [...rows].sort((a: any, b: any) => {
    const av = a?.[field];
    const bv = b?.[field];
    // Missing values always sort to the end regardless of direction.
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    let cmp: number;
    if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
    else cmp = String(av).localeCompare(String(bv));
    return desc ? -cmp : cmp;
  });
}

// Fetch a list of documents for a regular (multi-record) doctype.
// Set includeChildTables when the doctype has a Table field the caller needs
// (e.g. a "gallery" of images) — see the getSingle comment for why a plain
// list fetch can't return that data, so each record is re-fetched by name.
export async function getList<T = any>(
  doctype: string,
  orderBy?: string,
  includeChildTables = false
): Promise<T[]> {
  try {
    const rows = await frappeGet(doctype, {
      fields: '["*"]',
      limit_page_length: '0',
    });
    if (!Array.isArray(rows)) return [];
    const sorted = sortRows(rows, orderBy);
    if (!includeChildTables) return sorted;
    return await Promise.all(sorted.map((row: any) => frappeGetByName(doctype, row.name)));
  } catch (error) {
    console.error(`[Frappe] Error fetching list "${doctype}":`, error);
    return [];
  }
}

const CLOUDINARY_UPLOAD_RE = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload)\/(.*)$/;

// Insert Cloudinary's on-the-fly transformation segment (width/quality/format)
// into a Cloudinary delivery URL. No-op for any other URL.
function withCloudinaryTransform(url: string, width: number, quality: number | 'auto'): string {
  const match = url.match(CLOUDINARY_UPLOAD_RE);
  if (!match) return url;
  return `${match[1]}/w_${width},q_${quality},f_auto/${match[2]}`;
}

export interface ImageOptions {
  width?: number;
  quality?: number | 'auto';
}

// Resolve a Frappe attach-field value into a fully-qualified, optimized URL
// the browser can load directly. Handles three cases: a relative Frappe
// /files/... path, an absolute Cloudinary URL (gets width/quality/format
// transform params applied), or any other already-absolute URL (passthrough).
export function resolveImageUrl(path?: string | null, options: ImageOptions = {}): string | undefined {
  if (!path) return undefined;
  const { width = 1920, quality = 80 } = options;
  if (!/^https?:\/\//i.test(path)) {
    return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  }
  return withCloudinaryTransform(path, width, quality);
}

export function resolveImageUrls(
  paths?: (string | null | undefined)[] | null,
  options: ImageOptions = {}
): string[] {
  if (!paths) return [];
  return paths.filter(Boolean).map((p) => resolveImageUrl(p, options) as string);
}

// Split a newline-delimited Small/Long Text field into a clean string array
export function splitLines(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
