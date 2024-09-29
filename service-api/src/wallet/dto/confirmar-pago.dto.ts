import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmarPagoDto {
  @ApiProperty({ description: 'Número de documento del cliente' })
  @IsNotEmpty({ message: 'El documento es requerido' })
  documento: string;

  @ApiProperty({ description: 'Monto del pago a confirmar' })
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(1, { message: 'El monto debe ser mayor que 0' })
  monto: number;

  @ApiProperty({ description: 'Token de confirmación' })
  @IsNotEmpty({ message: 'El token es requerido' })
  token: string;

  @ApiProperty({ description: 'ID de sesión de pago' })
  @IsNotEmpty({ message: 'El sessionId es requerido' })
  sessionId: string;
}
