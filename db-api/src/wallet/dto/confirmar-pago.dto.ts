import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class ConfirmarPagoDto {
  @IsNotEmpty({ message: 'El documento es requerido' })
  documento: string;

  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(1, { message: 'El monto debe ser mayor que 0' })
  monto: number;

  @IsNotEmpty({ message: 'El token es requerido' })
  token: string;

  @IsNotEmpty({ message: 'El token es requerido' })
  sessionId: string;
}
