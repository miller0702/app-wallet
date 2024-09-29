import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty({ message: 'El documento es requerido' })
  documento: string;

  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(1, { message: 'El monto debe ser mayor que 0' })
  monto: number;

  @IsNotEmpty({ message: 'El celular es requerido' })
  @IsString()
  celular: string; 
}
