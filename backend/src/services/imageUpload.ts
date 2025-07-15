import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export class ImageUploadService {
  /**
   * Upload image to Cloudinary
   * @param file - File buffer or base64 string
   * @param folder - Cloudinary folder to organize images
   * @param publicId - Optional custom public ID
   * @returns Promise with upload result
   */
  static async uploadImage(
    file: Buffer | string,
    folder: string = 'vehicles',
    publicId?: string
  ): Promise<ImageUploadResult> {
    try {
      const uploadOptions: any = {
        folder,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
        transformation: [
          { width: 1200, height: 800, crop: 'fill', gravity: 'center' },
          { quality: 'auto:good' }
        ]
      };

      if (publicId) {
        uploadOptions.public_id = publicId;
        uploadOptions.overwrite = true;
      }

      let result: UploadApiResponse;

      if (Buffer.isBuffer(file)) {
        // Upload from buffer
        result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) reject(error);
              else resolve(result!);
            }
          ).end(file);
        });
      } else {
        // Upload from base64 or URL
        result = await cloudinary.uploader.upload(file, uploadOptions);
      }

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  /**
   * Delete image from Cloudinary
   * @param publicId - Public ID of the image to delete
   * @returns Promise with deletion result
   */
  static async deleteImage(publicId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await cloudinary.uploader.destroy(publicId);
      return { success: true };
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed'
      };
    }
  }

  /**
   * Generate optimized image URL with transformations
   * @param publicId - Public ID of the image
   * @param width - Desired width
   * @param height - Desired height
   * @returns Optimized image URL
   */
  static getOptimizedUrl(
    publicId: string,
    width: number = 800,
    height: number = 600
  ): string {
    return cloudinary.url(publicId, {
      width,
      height,
      crop: 'fill',
      gravity: 'center',
      quality: 'auto',
      fetch_format: 'auto'
    });
  }
}
