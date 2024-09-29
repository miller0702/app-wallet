import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post('register')
  async registerClient(@Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientsService.registerClient(createClientDto);
      return {
        message: 'Cliente registrado exitosamente.',
        client,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al registrar el cliente.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('send-token')
  async sendToken(@Body() { documento, celular }: { documento: string, celular: string }) {
    try {
      await this.clientsService.sendLoginToken(documento, celular);
      return { message: 'Token enviado al correo electrónico.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al enviar el token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-token')
  async verifyToken(@Body() { documento, token }: { documento: string, token: string }) {
    try {
      const isValid = await this.clientsService.verifyLoginToken(documento, token);
      return { message: 'Token verificado correctamente.', isValid };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al verificar el token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('validate')
  async validateClient(@Body() { documento, celular }: { documento: string; celular: string }) {
    try {
      const { valid, message, client } = await this.clientsService.validateClient(documento, celular);
      return { valid, message, client };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al validar el cliente.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
