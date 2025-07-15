import { Router, Request, Response } from 'express';
import { query, body, validationResult } from 'express-validator';
import prisma from '../services/database';
import { ApiResponse } from '../types';

const router = Router();

// GET /api/vehicles - Get all vehicles with optional city filter
router.get('/', [
  query('city').optional().isString().trim(),
  query('category').optional().isIn(['HELICOPTER', 'PRIVATE_JET', 'BUS', 'PRIVATE_CAR']),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { city, category } = req.query;

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (city) {
      where.city = {
        slug: city.toString().toLowerCase()
      };
    }

    if (category) {
      where.category = category;
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      include: {
        city: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      },
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });

    res.json({
      success: true,
      data: vehicles,
      count: vehicles.length
    });

  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/vehicles/:id - Get single vehicle by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      }
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });

  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/vehicles/categories/:city - Get available vehicle categories for a city
router.get('/categories/:city', async (req: Request, res: Response) => {
  try {
    const { city } = req.params;

    const categories = await prisma.vehicle.findMany({
      where: {
        isActive: true,
        city: {
          slug: city.toLowerCase()
        }
      },
      select: {
        category: true
      },
      distinct: ['category']
    });

    const categoryList = categories.map(c => c.category);

    res.json({
      success: true,
      data: categoryList
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Validation middleware for vehicle creation/update
const vehicleValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Vehicle name must be between 2 and 100 characters'),
  body('category')
    .isIn(['HELICOPTER', 'PRIVATE_JET', 'BUS', 'PRIVATE_CAR'])
    .withMessage('Category must be one of: HELICOPTER, PRIVATE_JET, BUS, PRIVATE_CAR'),
  body('capacity')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Capacity is required'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('features')
    .isArray()
    .withMessage('Features must be an array'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('priceRange')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Price range is required'),
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('cityId')
    .isString()
    .isLength({ min: 20, max: 30 })
    .withMessage('Valid city ID is required'),
];

// POST /api/vehicles - Create new vehicle
router.post('/', vehicleValidation, async (req: Request, res: Response) => {
  try {
    console.log('Received vehicle data:', JSON.stringify(req.body, null, 2));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      const response: ApiResponse = {
        success: false,
        message: 'Validation failed',
        error: errors.array().map(err => err.msg).join(', '),
      };
      return res.status(400).json(response);
    }

    const { name, category, capacity, description, features, image, priceRange, isActive, cityId } = req.body;

    // Verify city exists
    const city = await prisma.city.findUnique({
      where: { id: cityId }
    });

    if (!city) {
      const response: ApiResponse = {
        success: false,
        message: 'City not found',
      };
      return res.status(404).json(response);
    }

    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        category,
        capacity,
        description,
        features,
        image: image || '',
        priceRange,
        isActive,
        cityId,
      },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating vehicle:', error);

    const response: ApiResponse = {
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    };

    res.status(500).json(response);
  }
});

// PUT /api/vehicles/:id - Update vehicle
router.put('/:id', vehicleValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse = {
        success: false,
        message: 'Validation failed',
        error: errors.array().map(err => err.msg).join(', '),
      };
      return res.status(400).json(response);
    }

    const { id } = req.params;
    const { name, category, capacity, description, features, image, priceRange, isActive, cityId } = req.body;

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id }
    });

    if (!existingVehicle) {
      const response: ApiResponse = {
        success: false,
        message: 'Vehicle not found',
      };
      return res.status(404).json(response);
    }

    // Verify city exists
    const city = await prisma.city.findUnique({
      where: { id: cityId }
    });

    if (!city) {
      const response: ApiResponse = {
        success: false,
        message: 'City not found',
      };
      return res.status(404).json(response);
    }

    // Update vehicle
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name,
        category,
        capacity,
        description,
        features,
        image: image || '',
        priceRange,
        isActive,
        cityId,
      },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle,
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating vehicle:', error);

    const response: ApiResponse = {
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    };

    res.status(500).json(response);
  }
});

// DELETE /api/vehicles/:id - Delete vehicle
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id }
    });

    if (!existingVehicle) {
      const response: ApiResponse = {
        success: false,
        message: 'Vehicle not found',
      };
      return res.status(404).json(response);
    }

    // Delete vehicle
    await prisma.vehicle.delete({
      where: { id }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Vehicle deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting vehicle:', error);

    const response: ApiResponse = {
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    };

    res.status(500).json(response);
  }
});

export default router;
