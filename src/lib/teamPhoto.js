// ============================================================
// TEAM PHOTO HELPERS — Cloudinary delivery URLs for member cards
// ============================================================
// Member photos come from several Cloudinary accounts and are
// uploaded in every shape imaginable: 6000px DSLR landscapes,
// 2:9 phone screenshots, HEICs, PNGs. Rendering the raw upload
// with a CSS `object-cover` crop had three problems:
//
//   1. Blind cropping — `object-top` cuts through chins on very
//      tall photos and pushes faces out of frame on wide ones.
//   2. Payload — a few originals were 3–10 MB each.
//   3. Two shapes per breakpoint (4:5 on phones, 1:1 on larger
//      screens) meant no single crop looked right everywhere.
//
// Instead we let Cloudinary do a content-aware crop (`c_auto,g_auto`:
// keeps faces in frame and zooms in on full-body shots)
// server-side, at the exact aspect ratio and width the card
// needs, and serve it as an auto-format/auto-quality asset.
// ============================================================

const CLOUDINARY_UPLOAD =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;

/** True when the value is a usable http(s) URL (data file uses
 *  'PLACEHOLDER: ...' strings for members whose photo is pending). */
export const hasPhoto = url =>
  typeof url === 'string' && /^https?:\/\//.test(url);

/**
 * Builds a Cloudinary delivery URL cropped to `aspect` at `width` px.
 * Any transformation already present in the stored URL (e.g. an
 * `e_contrast` tweak or an older `ar_4:5,c_fill,g_face`) is kept and
 * our crop is chained after it. Non-Cloudinary URLs are returned as-is.
 *
 * @param {string} url     Stored image URL
 * @param {object} opts
 * @param {string} opts.aspect  Cloudinary aspect ratio, e.g. '4:5' or '1:1'
 * @param {number} opts.width   Output width in px
 */
export const teamPhotoUrl = (url, { aspect = '4:5', width = 600 } = {}) => {
  if (!hasPhoto(url)) return '';
  const match = url.match(CLOUDINARY_UPLOAD);
  if (!match) return url;

  const [, base, rest] = match;
  const segments = rest.split('/');
  // Last segment is always the public id (+ extension); everything
  // before it is either a version marker (v123…) or a transformation.
  const publicId = segments.pop();
  const version = segments.find(s => /^v\d+$/.test(s));
  const existing = segments.filter(s => !/^v\d+$/.test(s));

  const crop = `c_auto,g_auto,ar_${aspect},w_${width},q_auto,f_auto`;
  return [base.replace(/\/$/, ''), ...existing, crop, version, publicId]
    .filter(Boolean)
    .join('/');
};

/** `srcSet` string for the given aspect across a few device widths. */
export const teamPhotoSrcSet = (url, aspect, widths = [400, 640, 900]) =>
  widths
    .map(w => `${teamPhotoUrl(url, { aspect, width: w })} ${w}w`)
    .join(', ');

/** Initials shown in the fallback avatar when a photo is missing. */
export const initialsOf = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');
