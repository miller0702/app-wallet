import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PendingPayment {
  @Prop({ required: true })
  monto: number;

  @Prop({ required: true })
  token: string;
}
