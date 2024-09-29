// src/wallet/wallet.module.ts
import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from '../../api/api.service';

@Module({
  imports: [HttpModule],
  providers: [WalletService, ApiService],
  controllers: [WalletController],
})
export class WalletModule {}
