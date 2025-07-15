import express from 'express';
import { body, validationResult } from 'express-validator';
import emailService from '../services/emailService';
import { ContactRequest, ApiResponse } from '../types';

const router = express.Router();

// Validation middleware
const contactValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('phone')
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req: express.Request, res: express.Response) => {
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

    const contactData: ContactRequest = req.body;

    // Generate and send email
    const emailTemplate = emailService.generateContactEmailTemplate(contactData);
    const emailSent = await emailService.sendEmail(emailTemplate);

    if (!emailSent) {
      console.error('Failed to send contact email');
      // Don't fail the request if email fails, just log it
    }

    // Log contact request (in production, you'd save to database)
    console.log('New contact request:', {
      name: contactData.fullName,
      email: contactData.email,
      timestamp: new Date().toISOString(),
    });

    const response: ApiResponse = {
      success: true,
      message: 'Message sent successfully. We will get back to you within 24 hours.',
      data: {
        messageId: `MSG${Date.now()}`, // Generate a simple message ID
        estimatedResponse: '24 hours',
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error processing contact request:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    };
    
    res.status(500).json(response);
  }
});

// GET /api/contact/health - Health check for contact service
router.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    service: 'contact',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

export default router;
