import { Router, Request, Response } from 'express';
import prisma from '../services/database';

const router = Router();

// GET /api/cities - Get all active cities
router.get('/', async (req: Request, res: Response) => {
  try {
    const cities = await prisma.city.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        slug: true,
        country: true,
        _count: {
          select: {
            vehicles: {
              where: {
                isActive: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.json({
      success: true,
      data: cities
    });

  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/cities/:slug - Get city by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const city = await prisma.city.findUnique({
      where: { slug: slug.toLowerCase() },
      include: {
        _count: {
          select: {
            vehicles: {
              where: {
                isActive: true
              }
            }
          }
        }
      }
    });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }

    res.json({
      success: true,
      data: city
    });

  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
