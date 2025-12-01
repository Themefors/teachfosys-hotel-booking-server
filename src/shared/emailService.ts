import nodemailer, { Transporter } from 'nodemailer';
import config from '../config';
import { logger } from './logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: Number(config.email.port),
      secure: Number(config.email.port) === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: config.email.from || config.email.user,
        to: options.to,
        subject: options.subject,
        text: options.text || '',
        html: options.html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(
        `Email sent successfully to ${options.to}: ${info.messageId}`
      );
    } catch (error) {
      logger.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const subject = 'Welcome to TeachFosys Booking System';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to TeachFosys!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for signing up with TeachFosys Booking System. Your account has been successfully created!</p>
            <p>You can now access all features of our platform:</p>
            <ul>
              <li>Book rooms and facilities</li>
              <li>Manage your bookings</li>
              <li>Access your profile</li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>We're excited to have you on board!</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} TeachFosys. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `Hello ${name},\n\nThank you for signing up with TeachFosys Booking System. Your account has been successfully created!\n\nWe're excited to have you on board!`;

    await this.sendEmail({ to: email, subject, html, text });
  }

  async sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Password Reset Request';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f44336; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { background-color: #f44336; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
          .warning { background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <div class="warning">
              <strong>Note:</strong> This link will expire in 1 hour. If you didn't request this, please ignore this email.
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all;">${resetUrl}</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} TeachFosys. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `Hello ${name},\n\nWe received a request to reset your password. Click the link below to reset it:\n\n${resetUrl}\n\nThis link will expire in 1 hour.`;

    await this.sendEmail({ to: email, subject, html, text });
  }

  async sendOtpEmail(email: string, name: string, otp: string): Promise<void> {
    const subject = 'OTP Verification - Hotel Booking';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .otp-box { font-size: 28px; font-weight: bold; letter-spacing: 4px; padding: 15px 20px; background: #ffffff; border-radius: 6px; border: 1px solid #ddd; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>OTP Verification</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Use the following One-Time Password (OTP) to complete your verification:</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
            <p>If you did not request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} TeachFosys. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `Hello ${name},\n\nYour OTP for verification is: ${otp}\n\nThis OTP is valid for a limited time. Do not share it with anyone.`;

    await this.sendEmail({ to: email, subject, html, text });
  }
}

export const emailService = new EmailService();
