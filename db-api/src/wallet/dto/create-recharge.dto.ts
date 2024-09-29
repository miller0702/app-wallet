import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRechargeDto {
  @ApiProperty({ description: 'Número de documento del cliente', example: '123456789' })
  @IsNotEmpty({ message: 'El documento es requerido' })
  documento: string;

  @ApiProperty({ description: 'Número de celular del cliente', example: '987654321' })
  @IsNotEmpty()
  @IsString()
  celular: string;

  @ApiProperty({ description: 'Monto de la recarga', example: 50 })
  @IsNotEmpty()
  @IsNumber({}, { message: 'El monto debe ser un número' })
  monto: number;
}
