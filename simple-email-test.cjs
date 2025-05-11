require('dotenv').config();
const nodemailer = require('nodemailer');

async function main() {
  console.log('Testing email configuration:');
  console.log({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]'
  });

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection verified!');

    // Send email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL || process.env.EMAIL_USER,
      subject: 'Test Email from Node.js',
      text: 'This is a test email to verify SMTP settings.',
      html: '<p>This is a test email to verify SMTP settings.</p>'
    });

    console.log('✓ Email sent!', info.messageId);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Code:', error.code);
    if (error.response) console.error('Response:', error.response);
    
    // Recommendations based on error type
    if (error.code === 'EAUTH') {
      console.error('\nAuthentication failed. Suggestions:');
      console.error('1. Double check your EMAIL_USER and EMAIL_PASS in .env');
      console.error('2. Make sure you\'re using the full email address as username');
      console.error('3. Consider enabling "Less secure app access" if using Gmail');
      console.error('4. Try using an app password if 2FA is enabled');
    } else if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
      console.error('\nConnection issues. Suggestions:');
      console.error('1. Check if EMAIL_HOST and EMAIL_PORT are correct');
      console.error('2. Try using port 465 with secure: true instead of 587');
      console.error('3. Check if your internet provider blocks outgoing SMTP');
      console.error('4. Check if the mail server requires special configuration');
    }
  }
}

main().catch(console.error);
