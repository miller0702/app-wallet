import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Client extends Document {
  @ApiProperty({ description: 'Número de documento único del cliente' })
  @Prop({ required: true, unique: true })
  documento: string;

  @ApiProperty({ description: 'Nombres completos del cliente' })
  @Prop({ required: true })
  nombres: string;

  @ApiProperty({ description: 'Número de celular del cliente' })
  @Prop({ required: true })
  celular: string;

  @ApiProperty({ description: 'Correo electrónico del cliente' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Token de verificación del cliente', required: false })
  @Prop()
  token?: string;

  @ApiProperty({ description: 'Fecha de expiración del token', required: false })
  @Prop()
  tokenExpiration?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
