import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRechargeDto {
  @ApiProperty({ description: 'El documento del cliente', example: '12345678' })
  @IsNotEmpty({ message: 'El documento es requerido' })
  documento: string;

  @ApiProperty({ description: 'El número de celular del cliente', example: '3001234567' })
  @IsNotEmpty({ message: 'El celular es requerido' })
  @IsString({ message: 'El celular debe ser una cadena' })
  celular: string;

  @ApiProperty({ description: 'El monto de la recarga', example: 50.0 })
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  monto: number;
}
