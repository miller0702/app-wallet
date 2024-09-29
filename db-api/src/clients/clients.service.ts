import { Injectable, ConflictException, InternalServerErrorException, BadRequestException, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './schemas/clients.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { WalletsService } from '../wallet/wallet.service';
import { EmailService } from '../email/email.service';
import { ValidateClientDto } from './dto/validate-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private emailService: EmailService,
    @Inject(forwardRef(() => WalletsService)) private walletsService: WalletsService,
  ) { }

  async registerClient(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const existingClient = await this.clientModel.findOne({
        $or: [
          { documento: createClientDto.documento },
          { email: createClientDto.email },
        ],
      });

      if (existingClient) {
        throw new ConflictException('Cliente ya existe con el número de documento o email proporcionado.');
      }

      const newClient = new this.clientModel(createClientDto);
      await newClient.save();

      await this.walletsService.createWallet({ clientId: newClient.documento, saldo: 0 });

      return newClient;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al registrar el cliente.');
    }
  }

  async sendLoginToken(documento: string, celular: string): Promise<void> {
    const client = await this.clientModel.findOne({ documento, celular });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado.');
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const tokenExpiration = new Date();
    tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 10);

    client.token = token;
    client.tokenExpiration = tokenExpiration;
    await client.save();

    await this.emailService.sendToken(client.email, token);
  }

  async verifyLoginToken(documento: string, token: string): Promise<boolean> {
    const client = await this.clientModel.findOne({ documento, token });

    if (!client) {
      throw new BadRequestException('Token inválido o expirado.');
    }

    if (new Date() > client.tokenExpiration) {
      throw new BadRequestException('La sesión ha caducado.');
    }

    client.token = null;
    client.tokenExpiration = null;
    await client.save();

    return true;
  }

  async validateClient(validateClientDto: ValidateClientDto): Promise<any> {
    const client = await this.clientModel.findOne({
        documento: validateClientDto.documento,
        celular: validateClientDto.celular,
    });

    return {
        valid: true,
        message: 'Cliente validado correctamente.',
        client: client,
    };
}

  

}
