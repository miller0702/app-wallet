import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({ description: 'ID del cliente', example: 'client123' })
  @IsNotEmpty({ message: 'El clientId es requerido' })
  clientId: string;

  @ApiProperty({ description: 'Saldo inicial', example: 0, required: false })
  @IsNumber({}, { message: 'El saldo debe ser un número' })
  saldo?: number;
}
