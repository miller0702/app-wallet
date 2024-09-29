import { forwardRef, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/clients.schema';
import { EmailService } from '../email/email.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    forwardRef(() => WalletModule),
  ],
  providers: [ClientsService, EmailService],
  controllers: [ClientsController],
  exports: [ClientsService],
})
export class ClientsModule {}
