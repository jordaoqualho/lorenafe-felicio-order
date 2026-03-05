/**
 * Image Cache Busting Utility
 * 
 * This utility provides cache busting functionality for static images.
 * When you update an image file on the server with the same name, increment
 * the IMAGE_VERSION constant to force browsers to fetch the new version.
 * 
 * Usage:
 *   import { getImageUrl } from '@/utils/imageCache';
 *   const imageUrl = getImageUrl('/images/sweets/brigadeiro.jpg');
 *   // Returns: '/images/sweets/brigadeiro.jpg?v=2'
 */

/**
 * Image version for cache busting. Browsers and CDNs will fetch a new image
 * when this value changes. Set NEXT_PUBLIC_IMAGE_VERSION in your build (e.g.
 * to Vercel's VERCEL_GIT_COMMIT_SHA or a build timestamp) so each deploy
 * serves updated images; otherwise increment IMAGE_VERSION manually when
 * replacing image files.
 */
export const IMAGE_VERSION =
  typeof process.env.NEXT_PUBLIC_IMAGE_VERSION === "string" &&
  process.env.NEXT_PUBLIC_IMAGE_VERSION.length > 0
    ? process.env.NEXT_PUBLIC_IMAGE_VERSION
    : Math.random().toString(36).substring(2, 15);

/**
 * Adds cache busting query parameter to image URLs
 * 
 * @param imagePath - The path to the image (e.g., '/images/sweets/brigadeiro.jpg')
 * @returns The image path with cache busting query parameter, or undefined if path is empty
 * 
 * @example
 * getImageUrl('/images/sweets/brigadeiro.jpg')
 * // Returns: '/images/sweets/brigadeiro.jpg?v=2'
 * 
 * @example
 * getImageUrl('')
 * // Returns: undefined
 */
export function getImageUrl(imagePath: string | undefined): string | undefined {
  if (!imagePath) {
    return undefined;
  }

  // If the URL already has query parameters, append with &
  // Otherwise, add the version parameter with ?
  const separator = imagePath.includes('?') ? '&' : '?';
  return `${imagePath}${separator}v=${IMAGE_VERSION}`;
}

/**
 * Batch process multiple image paths for cache busting
 * 
 * @param imagePaths - Array of image paths
 * @returns Array of image paths with cache busting query parameters
 * 
 * @example
 * getImageUrls(['/images/sweets/brigadeiro.jpg', '/images/sweets/beijinho.jpg'])
 * // Returns: ['/images/sweets/brigadeiro.jpg?v=2', '/images/sweets/beijinho.jpg?v=2']
 */
export function getImageUrls(imagePaths: (string | undefined)[]): (string | undefined)[] {
  return imagePaths.map(getImageUrl);
}