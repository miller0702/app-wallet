import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateClientDto } from './dto/create-client.dto';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../../api/api.service';

@Injectable()
export class ClientsService {
  private readonly apiDbUrl: string;

  constructor(private readonly httpService: HttpService, private readonly apiService: ApiService) {
    this.apiDbUrl = `${this.apiService.getBaseUrl()}/clients`;
  }

  async registerClient(createClientDto: CreateClientDto): Promise<any> {
    try {
      const response = await lastValueFrom(this.httpService.post(`${this.apiDbUrl}/register`, createClientDto));
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          throw new HttpException('El cliente ya existe.', HttpStatus.CONFLICT);
        } else {
          throw new HttpException(error.response.data.message || 'Error al registrar el cliente.', error.response.status);
        }
      } else {
        throw new HttpException('Error al comunicar con el servidor.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async sendLoginToken(documento: string, celular: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.apiDbUrl}/send-token`, { documento, celular })
      );
      console.log('Token enviado:', response.data);
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al enviar el token.',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verifyLoginToken(documento: string, token: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.apiDbUrl}/verify-token`, { documento, token })
      );
      console.log('Token verificado:', response.data);
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al verificar el token.',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateClient(documento: string, celular: string): Promise<{ valid: boolean; message?: string; client?: any }> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.apiDbUrl}/validate`, { documento, celular })
      );

      return {
        valid: response.data.valid,
        message: response.data.message,
        client: response.data.client
      };
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message || 'Error al validar el cliente.',
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException('Error al comunicar con el servidor.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}
