import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { CreatePaymentDto } from './dto/create-pay.dto';
import { ApiService } from '../../api/api.service';
import { ConfirmarPagoDto } from './dto/confirmar-pago.dto';

@Injectable()
export class WalletService {
  private readonly apiDbUrl: string;

  constructor(private readonly httpService: HttpService, private readonly apiService: ApiService) {
    this.apiDbUrl = `${this.apiService.getBaseUrl()}/wallets`;
  }

  async rechargeWallet(createRechargeDto: CreateRechargeDto): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.apiDbUrl}/recharge`, createRechargeDto),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al recargar la billetera.',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async pay(createPaymentDto: CreatePaymentDto): Promise<any> {
    try {
      const response = await lastValueFrom(this.httpService.post(`${this.apiDbUrl}/pay`, createPaymentDto));
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud de pago:', error);
      throw new HttpException(
        error.response?.data?.message || 'Error al procesar el pago.',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  async confirmPayment(confirmarPagoDto: ConfirmarPagoDto): Promise<any> {
    try {
      const response = await lastValueFrom(this.httpService.post(`${this.apiDbUrl}/confirm-payment`, confirmarPagoDto));
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al confirmar el pago.',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWalletBalance(clientId: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.apiDbUrl}/${clientId}/balance`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al consultar el saldo.',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}