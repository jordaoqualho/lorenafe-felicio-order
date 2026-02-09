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
 * Image version number. Increment this value whenever you update image files
 * on the server to force browsers to fetch the new versions.
 * 
 * Format: Increment by 1 for each image update batch
 * Example: "1" -> "2" -> "3"
 */
export const IMAGE_VERSION = "2203";

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