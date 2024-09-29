// wallet.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { WalletsService } from './wallet.service';
import { WalletsController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { ClientsService } from '../clients/clients.service';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { ClientsModule } from '../clients/clients.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    forwardRef(() => ClientsModule),
    EmailModule,
  ],
  providers: [WalletsService],
  controllers: [WalletsController],
  exports: [WalletsService],
})
export class WalletModule {}
