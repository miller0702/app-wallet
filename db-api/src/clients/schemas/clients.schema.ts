import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Client extends Document {
  @Prop({ required: true, unique: true })
  documento: string;

  @Prop({ required: true })
  nombres: string;

  @Prop({ required: true })
  celular: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  token?: string;

  @Prop()
  tokenExpiration?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
