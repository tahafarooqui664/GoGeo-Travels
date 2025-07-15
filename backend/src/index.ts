import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bookingRoutes from './routes/booking';
import contactRoutes from './routes/contact';
import vehicleRoutes from './routes/vehicles';
import cityRoutes from './routes/cities';
import uploadRoutes from './routes/upload';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
}));
// app.use(morgan('combined')); // Removed for simplicity
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'London Elite Transport API is running',
    timestamp: new Date().toISOString(),
  });
});

// Simple database test endpoint
app.get('/api/db-test', async (req, res) => {
  try {
    const { PrismaClient } = await import('./generated/prisma');
    const testPrisma = new PrismaClient();

    // Simple query to test connection
    await testPrisma.$queryRaw`SELECT 1 as test`;
    await testPrisma.$disconnect();

    res.json({
      success: true,
      message: 'Database connection working',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// API Routes
app.use('/api/booking', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested endpoint does not exist',
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 London Elite Transport API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
