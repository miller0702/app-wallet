import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [ClientsModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
