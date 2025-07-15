import { EmailTemplate } from '../types';

class EmailService {
  private apiKey: string | undefined;
  private senderEmail: string;
  private senderName: string;

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY;
    this.senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@gogeotravels.com';
    this.senderName = process.env.BREVO_SENDER_NAME || 'GoGeo Travels London';

    if (!this.apiKey) {
      console.warn('BREVO_API_KEY is not configured - emails will be logged instead of sent');
    }
  }

  async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      if (!this.apiKey) {
        // Log email instead of sending when API key is not configured
        console.log('\n=== EMAIL NOTIFICATION (DEMO MODE) ===');
        console.log('To:', template.to.join(', '));
        console.log('Subject:', template.subject);
        console.log('From:', `${this.senderName} <${this.senderEmail}>`);
        console.log('HTML Content Preview:');
        console.log(template.htmlContent.substring(0, 500) + '...');
        console.log('=====================================\n');
        return true;
      }

      // Send actual email using Brevo API
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          sender: {
            name: this.senderName,
            email: this.senderEmail,
          },
          to: template.to.map(email => ({ email })),
          subject: template.subject,
          htmlContent: template.htmlContent,
          textContent: template.textContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Brevo API error:', errorData);
        return false;
      }

      const result = await response.json();
      console.log('Email sent successfully via Brevo:', result);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  generateBookingEmailTemplate(bookingData: any): EmailTemplate {
    const serviceTypeMap = {
      'helicopter': 'Helicopter Charter',
      'private-jet': 'Private Jet',
      'bus': 'Executive Bus',
      'private-car': 'Private Car',
    };

    const serviceType = serviceTypeMap[bookingData.serviceType as keyof typeof serviceTypeMap] || bookingData.serviceType;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Booking Request - GoGeo Travels London</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%); color: white; padding: 20px; text-align: center; }
          .content { background: #f8f9fa; padding: 20px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .detail-label { font-weight: bold; color: #1e293b; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚁 New Booking Request</h1>
            <p>GoGeo Travels London</p>
          </div>
          
          <div class="content">
            <h2>Booking Details</h2>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Service Type:</span>
                <span>${serviceType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Trip Type:</span>
                <span>${bookingData.isRoundTrip ? 'Round Trip' : 'One Way'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Pickup Location:</span>
                <span>${bookingData.pickupLocation}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Drop-off Location:</span>
                <span>${bookingData.dropoffLocation}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Pickup Date & Time:</span>
                <span>${bookingData.pickupDate} at ${bookingData.pickupTime}</span>
              </div>
              ${bookingData.isRoundTrip ? `
              <div class="detail-row">
                <span class="detail-label">Return Date & Time:</span>
                <span>${bookingData.returnDate} at ${bookingData.returnTime}</span>
              </div>
              ` : ''}
              <div class="detail-row">
                <span class="detail-label">Passengers:</span>
                <span>${bookingData.passengers}</span>
              </div>
            </div>

            <h3>Customer Information</h3>
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span>${bookingData.firstName} ${bookingData.lastName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span>${bookingData.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span>${bookingData.phone}</span>
              </div>
              ${bookingData.specialRequests ? `
              <div class="detail-row">
                <span class="detail-label">Special Requests:</span>
                <span>${bookingData.specialRequests}</span>
              </div>
              ` : ''}
            </div>

            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Review the booking details above</li>
              <li>Contact the customer within 2 hours</li>
              <li>Provide a detailed quote</li>
              <li>Confirm availability and finalize booking</li>
            </ul>
          </div>

          <div class="footer">
            <p>GoGeo Travels London - Premium Transportation Services</p>
            <p>+44 208 432 6418 | info@gogeotravels.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: [process.env.ADMIN_EMAIL || 'admin@londonelitetransport.com'],
      subject: `New ${serviceType} Booking Request - ${bookingData.firstName} ${bookingData.lastName}`,
      htmlContent,
    };
  }

  generateContactEmailTemplate(contactData: any): EmailTemplate {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Message - GoGeo Travels London</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%); color: white; padding: 20px; text-align: center; }
          .content { background: #f8f9fa; padding: 20px; }
          .message-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .detail-label { font-weight: bold; color: #1e293b; }
          .message-content { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Message</h1>
            <p>GoGeo Travels London</p>
          </div>
          
          <div class="content">
            <h2>Contact Details</h2>
            
            <div class="message-details">
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span>${contactData.fullName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span>${contactData.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span>${contactData.phone}</span>
              </div>
            </div>

            <h3>Message</h3>
            <div class="message-content">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>

            <p><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
          </div>

          <div class="footer">
            <p>GoGeo Travels London - Premium Transportation Services</p>
            <p>+44 208 432 6418 | info@gogeotravels.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: [process.env.ADMIN_EMAIL || 'admin@gogeotravels.com'],
      subject: `New Contact Message from ${contactData.fullName}`,
      htmlContent,
    };
  }
}

export default new EmailService();
