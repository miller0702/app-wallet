import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  clientId: string;

  @IsNumber()
  saldo?: number;
}
