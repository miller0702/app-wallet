import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendToken(to: string, token: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Tu código de acceso',
      text: `Tu código de acceso es: ${token}`,
      html: `<p>Tu código de acceso es: <strong>${token}</strong></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new InternalServerErrorException('No se pudo enviar el correo electrónico.');
    }
  }

  async sendTokenPay(to: string, token: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Tu código de compra',
      text: `Tu código para confirmar la compra es: ${token}`,
      html: `<p>Tu código para confirmar la compra es: <strong>${token}</strong></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new InternalServerErrorException('No se pudo enviar el correo electrónico.');
    }
  }
}
