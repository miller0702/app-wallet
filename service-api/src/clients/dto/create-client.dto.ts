import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Número de documento del cliente', example: '123456789' })
  @IsNotEmpty({ message: 'El documento es requerido' })
  documento: string;

  @ApiProperty({ description: 'Nombres del cliente', example: 'Juan Pérez' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombres: string;

  @ApiProperty({ description: 'Número de celular del cliente', example: '987654321' })
  @IsNotEmpty({ message: 'El celular es requerido' })
  celular: string;

  @ApiProperty({ description: 'Email del cliente', example: 'juan.perez@example.com' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;
}
