import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRechargeDto {
  @IsNotEmpty()
  documento: string;

  @IsNotEmpty()
  @IsString()
  celular: string;

  @IsNotEmpty()
  @IsNumber()
  monto: number;
}