import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, email, message } = await req.json();

    // Validate the required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a nodemailer transporter
    // Using environment variables for security
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email recipient - your email address
    const emailTo = process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER;

    // Configure the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailTo,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <h2 style="color: #3b82f6; margin-bottom: 20px;">New Contact Form Message</h2>
  
  <div style="margin-bottom: 20px; padding: 15px; background-color: #f0f9ff; border-radius: 6px; border-left: 4px solid #3b82f6;">
    <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
  </div>
  
  <div style="padding: 15px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
    <h3 style="margin-top: 0; color: #4b5563;">Message:</h3>
    <div style="white-space: pre-wrap;">${message}</div>
  </div>
  
  <p style="font-size: 12px; color: #6b7280; margin-top: 20px; text-align: center;">
    This message was sent from your website contact form.
  </p>
</div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return a success response
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 