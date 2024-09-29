import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente registrado exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error al registrar el cliente.' })
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
  @ApiOperation({ summary: 'Enviar token de inicio de sesión' })
  @ApiResponse({ status: 200, description: 'Token enviado al correo electrónico.' })
  @ApiResponse({ status: 500, description: 'Error al enviar el token.' })
  async sendToken(@Body() { documento, celular }: { documento: string; celular: string }) {
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
  @ApiOperation({ summary: 'Verificar token de inicio de sesión' })
  @ApiResponse({ status: 200, description: 'Token verificado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error al verificar el token.' })
  async verifyToken(@Body() { documento, token }: { documento: string; token: string }) {
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
  @ApiOperation({ summary: 'Validar un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente validado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error al validar el cliente.' })
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
