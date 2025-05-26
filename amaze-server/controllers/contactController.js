import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail address
    pass: 'your-app-password' // Replace with your Gmail app password
  }
});

export const sendContactEmail = async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Just return success response
    console.log('Sending success response');
    res.status(200).json({ 
      message: 'Message received successfully! We will get back to you soon.',
      submission: {
        name,
        email,
        subject,
        message
      }
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ message: 'Error processing your message' });
  }
}; 