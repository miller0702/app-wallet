import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Número de documento del cliente', example: '123456789' })
  @IsNotEmpty({ message: 'El documento es requerido' })
  @IsString({ message: 'El documento debe ser una cadena de texto' })
  documento: string;

  @ApiProperty({ description: 'Monto del pago', example: 100 })
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(1, { message: 'El monto debe ser mayor que 0' })
  monto: number;

  @ApiProperty({ description: 'Número de celular del cliente', example: '987654321' })
  @IsNotEmpty({ message: 'El celular es requerido' })
  @IsString()
  celular: string; 
}
