# GoGeo Travels London

An elegant, luxury transportation booking platform for London featuring helicopters, private jets, executive buses, and private cars.

## 🚁 Features

- **Multi-Service Platform**: Book helicopters, private jets, executive buses, and private cars
- **Elegant Design**: Sophisticated UI/UX with a classy color scheme
- **Comprehensive Booking**: Multi-step booking form with London-specific locations
- **Contact Management**: Contact form with admin email notifications
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Email Integration**: Brevo integration for automated email notifications

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom luxury color palette
- **Components**: Modular React components for reusability
- **Forms**: Multi-step booking form with validation

### Backend (Node.js)
- **Framework**: Express.js with TypeScript
- **Email Service**: Brevo integration for notifications
- **Validation**: Express-validator for form validation
- **Security**: Helmet, CORS, and input sanitization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Geo-Travels
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your configuration
   # Add your Brevo API key for email functionality
   ```

5. **Start Development Servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000

## 📧 Email Configuration

To enable email notifications:

1. Sign up for a [Brevo](https://www.brevo.com/) account
2. Get your API key from the Brevo dashboard
3. Update your `.env` file:
   ```env
   BREVO_API_KEY=your_api_key_here
   BREVO_SENDER_EMAIL=noreply@yourdomain.com
   BREVO_SENDER_NAME=London Elite Transport
   ADMIN_EMAIL=admin@yourdomain.com
   ```

## 🛣️ API Endpoints

### Booking
- `POST /api/booking` - Submit booking request
- `GET /api/booking/health` - Booking service health check

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/health` - Contact service health check

### System
- `GET /health` - Overall system health

## 🎨 Design Features

### Color Palette
- **Primary**: Sophisticated slate grays (#1e293b to #f8fafc)
- **Accent**: Elegant gold tones (#eab308 to #fefce8)
- **Luxury**: Warm stone colors (#1c1917 to #fafaf9)

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- **Navigation**: Sticky header with smooth scrolling
- **Hero Section**: Full-screen with service type cards
- **Fleet Section**: Filterable vehicle showcase
- **Booking Form**: 3-step progressive form
- **Contact Section**: Integrated contact form and information

## 🚁 Services Offered

### Helicopters
- Executive Helicopter (4-6 passengers)
- VIP Helicopter (2-4 passengers)

### Private Jets
- Light Private Jet (6-8 passengers)
- Mid-Size Private Jet (8-10 passengers)
- Heavy Private Jet (12-16 passengers)

### Executive Buses
- Executive Coach (25-35 passengers)
- Luxury Tour Bus (45-55 passengers)
- VIP Party Bus (15-25 passengers)

### Private Cars
- Luxury Sedan (1-3 passengers)
- Executive SUV (1-6 passengers)
- Rolls-Royce (1-4 passengers)

## 📍 London Locations

The platform includes comprehensive London locations:
- **Airports**: Heathrow, Gatwick, Stansted, Luton, City Airport
- **Helipads**: Battersea Heliport, Redhill Aerodrome
- **Hotels**: The Ritz, The Savoy, Claridge's
- **Landmarks**: Buckingham Palace, Tower Bridge, Canary Wharf
- **Stations**: King's Cross, Paddington, Victoria, Waterloo

## 🔧 Development

### Project Structure
```
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── lib/             # Utility functions and data
│   │   └── types/           # TypeScript type definitions
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic services
│   │   ├── types/           # TypeScript type definitions
│   │   └── index.ts         # Server entry point
└── README.md
```

### Available Scripts

**Frontend**:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend**:
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Set up your hosting platform
2. Configure environment variables
3. Deploy the backend service

## 📞 Support

For support and inquiries:
- **Phone**: +44 208 432 6418
- **Email**: info@londonelitetransport.com
- **Address**: Canary Wharf, London E14 5AB, United Kingdom

## 📄 License

This project is proprietary software for London Elite Transport.

---

Built with ❤️ for luxury transportation in London
