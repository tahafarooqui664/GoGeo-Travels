import express from 'express';
import { body, validationResult } from 'express-validator';
import emailService from '../services/emailService';
import prisma from '../services/database';
import { BookingRequest, ApiResponse } from '../types';

const router = express.Router();

// Validation middleware
const bookingValidation = [
  body('city')
    .notEmpty()
    .withMessage('City is required'),
  body('transportMode')
    .isIn(['HELICOPTER', 'PRIVATE_JET', 'BUS', 'PRIVATE_CAR'])
    .withMessage('Transport mode must be one of: HELICOPTER, PRIVATE_JET, BUS, PRIVATE_CAR'),
  body('vehicleId')
    .optional()
    .isString()
    .withMessage('Vehicle ID must be a string'),
  body('pickupLocation')
    .notEmpty()
    .withMessage('Pickup location is required'),
  body('dropoffLocation')
    .notEmpty()
    .withMessage('Drop-off location is required'),
  body('pickupDate')
    .isISO8601()
    .withMessage('Invalid pickup date format'),
  body('pickupTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid pickup time format'),
  body('passengers')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Number of passengers is required'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('phone')
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),

  body('specialRequests')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Special requests must be less than 1000 characters'),
];

// POST /api/booking - Create new booking request
router.post('/', bookingValidation, async (req: express.Request, res: express.Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse = {
        success: false,
        message: 'Validation failed',
        error: errors.array().map(err => err.msg).join(', '),
      };
      return res.status(400).json(response);
    }

    const bookingData: BookingRequest = req.body;

    // Basic date validation
    const pickupDateTime = new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`);
    const now = new Date();

    if (pickupDateTime <= now) {
      const response: ApiResponse = {
        success: false,
        message: 'Pickup date and time must be in the future',
      };
      return res.status(400).json(response);
    }

    // Validate passenger count (now as string)
    const passengersNum = parseInt(bookingData.passengers);
    if (isNaN(passengersNum) || passengersNum < 1 || passengersNum > 50) {
      const response: ApiResponse = {
        success: false,
        message: 'Number of passengers must be a valid number between 1 and 50',
      };
      return res.status(400).json(response);
    }

    // Find the city
    const city = await prisma.city.findFirst({
      where: {
        OR: [
          { slug: bookingData.city.toLowerCase() },
          { name: { equals: bookingData.city, mode: 'insensitive' } }
        ]
      }
    });

    if (!city) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid city selected',
      };
      return res.status(400).json(response);
    }

    // Validate vehicle if provided
    let vehicle = null;
    if (bookingData.vehicleId) {
      vehicle = await prisma.vehicle.findFirst({
        where: {
          id: bookingData.vehicleId,
          cityId: city.id,
          isActive: true
        }
      });

      if (!vehicle) {
        const response: ApiResponse = {
          success: false,
          message: 'Invalid vehicle selected for this city',
        };
        return res.status(400).json(response);
      }
    }

    // Save booking request to database
    const savedBooking = await prisma.bookingRequest.create({
      data: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        transportMode: bookingData.transportMode as any,
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        pickupDate: new Date(bookingData.pickupDate),
        pickupTime: bookingData.pickupTime,
        passengers: bookingData.passengers,
        specialRequests: bookingData.specialRequests || null,
        cityId: city.id,
        vehicleId: vehicle?.id || null,
        status: 'PENDING'
      },
      include: {
        city: true,
        vehicle: true
      }
    });

    // Generate and send email
    const emailTemplate = emailService.generateBookingEmailTemplate(bookingData);
    const emailSent = await emailService.sendEmail(emailTemplate);

    if (!emailSent) {
      console.error('Failed to send booking email');
      // Don't fail the request if email fails, just log it
    }

    // Log booking request
    console.log('New booking request saved:', {
      id: savedBooking.id,
      customer: `${savedBooking.firstName} ${savedBooking.lastName}`,
      email: savedBooking.email,
      city: savedBooking.city.name,
      vehicle: savedBooking.vehicle?.name || 'Not specified',
      pickupDate: savedBooking.pickupDate,
      timestamp: savedBooking.createdAt,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Booking request submitted successfully. We will contact you within 2 hours with a detailed quote.',
      data: {
        bookingId: savedBooking.id,
        estimatedResponse: '2 hours',
        city: savedBooking.city.name,
        vehicle: savedBooking.vehicle?.name || null,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error processing booking request:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    };
    
    res.status(500).json(response);
  }
});

// GET /api/booking - Get booking requests (for admin)
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { city, status, page = 1, limit = 20 } = req.query;

    const where: any = {};

    if (city) {
      where.city = {
        slug: city.toString().toLowerCase()
      };
    }

    if (status) {
      where.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [bookings, total] = await Promise.all([
      prisma.bookingRequest.findMany({
        where,
        include: {
          city: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          vehicle: {
            select: {
              id: true,
              name: true,
              category: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: Number(limit)
      }),
      prisma.bookingRequest.count({ where })
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching booking requests:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/booking/health - Health check for booking service
router.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    service: 'booking',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// PATCH /api/booking/:id/status - Update booking status
router.patch('/:id/status', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', '),
      };
      return res.status(400).json(response);
    }

    // Update booking status
    const updatedBooking = await prisma.bookingRequest.update({
      where: { id },
      data: { status },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        vehicle: {
          select: {
            id: true,
            name: true,
            category: true
          }
        }
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking,
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating booking status:', error);

    const response: ApiResponse = {
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    };

    res.status(500).json(response);
  }
});

export default router;
