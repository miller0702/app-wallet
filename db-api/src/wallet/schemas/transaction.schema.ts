import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true, enum: ['recarga', 'pago']})
  tipo: string;

  @Prop({ default: Date.now })
  fecha: Date;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: true })
  descripcion: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
