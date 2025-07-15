/**
 * Cloudinary utility functions for image optimization
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dnluxha1i';

/**
 * Generate optimized Cloudinary URL with transformations
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'crop';
    gravity?: 'center' | 'face' | 'auto';
  } = {}
): string {
  const {
    width = 800,
    height = 600,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'center'
  } = options;

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    `q_${quality}`,
    `f_${format}`
  ].join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Full Cloudinary URL
 * @returns Public ID or null if not a valid Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  const cloudinaryPattern = /https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
  const match = url.match(cloudinaryPattern);
  return match ? match[1] : null;
}

/**
 * Check if URL is a Cloudinary URL
 * @param url - URL to check
 * @returns True if it's a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com');
}

/**
 * Get responsive image URLs for different screen sizes
 * @param publicId - The public ID of the image in Cloudinary
 * @returns Object with URLs for different screen sizes
 */
export function getResponsiveImageUrls(publicId: string) {
  return {
    mobile: getOptimizedImageUrl(publicId, { width: 400, height: 300 }),
    tablet: getOptimizedImageUrl(publicId, { width: 800, height: 600 }),
    desktop: getOptimizedImageUrl(publicId, { width: 1200, height: 800 }),
    large: getOptimizedImageUrl(publicId, { width: 1600, height: 1200 })
  };
}

/**
 * Generate srcSet for responsive images
 * @param publicId - The public ID of the image in Cloudinary
 * @returns srcSet string for responsive images
 */
export function generateSrcSet(publicId: string): string {
  const urls = getResponsiveImageUrls(publicId);
  return [
    `${urls.mobile} 400w`,
    `${urls.tablet} 800w`,
    `${urls.desktop} 1200w`,
    `${urls.large} 1600w`
  ].join(', ');
}
