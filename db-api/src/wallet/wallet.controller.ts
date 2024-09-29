import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WalletsService } from './wallet.service';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { CreatePaymentDto } from './dto/create-pay.dto';
import { ConfirmarPagoDto } from './dto/confirmar-pago.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post('recharge')
  async rechargeWallet(@Body() createRechargeDto: CreateRechargeDto) {
    return await this.walletsService.rechargeWallet(createRechargeDto);
  }
  
  @Post('pay')
  async pay(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.walletsService.pay(createPaymentDto);
  }

  @Post('confirm-payment')
  async confirmPayment(@Body() confirmarPagoDto: ConfirmarPagoDto) {
    return await this.walletsService.confirmPayment(confirmarPagoDto);
  }

  @Get(':clientId/balance')
  async getWalletBalance(@Param('clientId') clientId: string) {
    return await this.walletsService.getWalletBalance(clientId);
  }
}
