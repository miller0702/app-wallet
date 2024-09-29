import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'El documento del cliente', example: '12345678' })
  @IsNotEmpty({ message: 'El documento es requerido' })
  documento: string;

  @ApiProperty({ description: 'El número de celular del cliente', example: '3001234567' })
  @IsNotEmpty({ message: 'El celular es requerido' })
  @IsString({ message: 'El celular debe ser una cadena' })
  celular: string;

  @ApiProperty({ description: 'El monto del pago', example: 100.5 })
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(1, { message: 'El monto debe ser mayor que 0' })
  monto: number;
}
