import { Controller, Post, Body, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { CreatePaymentDto } from './dto/create-pay.dto';
import { ConfirmarPagoDto } from './dto/confirmar-pago.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('recharge')
  async rechargeWallet(@Body() createRechargeDto: CreateRechargeDto) {
    try {
      const response = await this.walletService.rechargeWallet(createRechargeDto);
      return {
        message: 'Recarga realizada con éxito.',
        saldo: response.saldo,
      };
    } catch (error) {
      throw new HttpException(
        'Error al realizar la recarga.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('pay')
  async pay(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const response = await this.walletService.pay(createPaymentDto);
      return {
        message: 'Pago solicitado. Se ha enviado un token al correo.',
        token: response.token,
      };
    } catch (error) {
      throw new HttpException(
        'Error al procesar el pago.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('confirm-payment')
  async confirmPayment(@Body() confirmarPagoDto: ConfirmarPagoDto) { 
    try {
      const response = await this.walletService.confirmPayment(confirmarPagoDto);
      return {
        message: 'Pago confirmado.',
        saldo: response.saldo,
      };
    } catch (error) {
      throw new HttpException(
        'Error al confirmar el pago.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':clientId/balance')
  async getWalletBalance(@Param('clientId') clientId: string) {
    try {
      const response = await this.walletService.getWalletBalance(clientId);
      return {
        message: 'Saldo consultado con éxito.',
        saldo: response.saldo,
        transacciones: response.transacciones,
      };
    } catch (error) {
      throw new HttpException(
        'Error al consultar el saldo.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}