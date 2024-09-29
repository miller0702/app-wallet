import { Controller, Post, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ValidateClientDto } from './dto/validate-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  async registerClient(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.registerClient(createClientDto);
  }

  @Post('send-token')
  async sendLoginToken(@Body() { documento, celular }: { documento: string, celular: string }) {
    await this.clientsService.sendLoginToken(documento, celular);
    return { message: 'Token enviado al correo electrónico' };
  }

  @Post('verify-token')
  async verifyLoginToken(@Body() { documento, token }: { documento: string, token: string }) {
    const isValid = await this.clientsService.verifyLoginToken(documento, token);
    return { message: 'Token verificado correctamente', isValid };
  }

  @Post('validate')
  async validateClient(@Body() validateClientDto: ValidateClientDto) {
    return await this.clientsService.validateClient(validateClientDto);
  }
}
