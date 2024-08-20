/* eslint-disable prettier/prettier */
import {Module } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [ConfigModule],  // Import ConfigModule to access environment variables
    providers: [EmailService],
    exports: [EmailService],  // Export EmailService so it can be used in other modules
  })

export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('smtp.gmail.com') || 'smtp.gmail.com',
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `http://localhost:3000/resetpw?token=${token}`;
    console.log("RestUrl: "+resetUrl);
    
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USERNAME'),
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
      html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
