import express from 'express';
import multer from 'multer';
import { ImageUploadService } from '../services/imageUpload';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

/**
 * POST /api/upload/image
 * Upload a single image to Cloudinary
 */
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const { folder = 'vehicles', publicId } = req.body;

    const result = await ImageUploadService.uploadImage(
      req.file.buffer,
      folder,
      publicId
    );

    if (result.success) {
      res.json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId
        },
        message: 'Image uploaded successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error || 'Upload failed'
      });
    }
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * DELETE /api/upload/image/:publicId
 * Delete an image from Cloudinary
 */
router.delete('/image/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Replace URL-encoded slashes back to forward slashes
    const decodedPublicId = decodeURIComponent(publicId);
    
    const result = await ImageUploadService.deleteImage(decodedPublicId);

    if (result.success) {
      res.json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error || 'Delete failed'
      });
    }
  } catch (error) {
    console.error('Delete route error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * POST /api/upload/base64
 * Upload image from base64 string
 */
router.post('/base64', async (req, res) => {
  try {
    const { image, folder = 'vehicles', publicId } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'No base64 image data provided'
      });
    }

    const result = await ImageUploadService.uploadImage(image, folder, publicId);

    if (result.success) {
      res.json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId
        },
        message: 'Image uploaded successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error || 'Upload failed'
      });
    }
  } catch (error) {
    console.error('Base64 upload route error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
