import crypto from 'crypto';

/**
 * Creates a URL-safe slug from a string
 * @param {string} text - The input text (usually the title)
 * @returns {string} The formatted slug with a unique hash appended
 */
export const generateSlug = (text) => {
  if (!text || typeof text !== 'string') {
    text = 'untitled';
  }

  // 1. Lowercase
  // 2. Remove special characters (keep alphanumeric and spaces)
  // 3. Trim spaces
  // 4. Replace spaces with hyphens
  // 5. Max length limit to prevent massive URLs
  const baseSlug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 50);

  // Append a unique 6-character short ID
  const uniqueId = crypto.randomBytes(3).toString('hex');
  
  return baseSlug ? `${baseSlug}-${uniqueId}` : `site-${uniqueId}`;
};
