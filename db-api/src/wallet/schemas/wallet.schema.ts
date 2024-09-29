import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transaction } from './transaction.schema';

@Schema()
export class PendingPayment {
  @Prop({ required: true })
  monto: number;

  @Prop({ required: true })
  token: string;
}


@Schema()
export class Wallet extends Document {
  @Prop({ required: true, unique: true })
  clientId: string;

  @Prop({ required: true, default: 0 })
  saldo: number;

  @Prop({ type: [Transaction], default: [] })
  transacciones: Transaction[];

  @Prop({ type: PendingPayment, default: null })
  pendingPayment: PendingPayment; 

  @Prop({ default: null })
  sessionId: string; 
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
