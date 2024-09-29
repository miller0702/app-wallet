import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Número de documento único del cliente', example: '123456789' })
  @IsNotEmpty()
  documento: string;

  @ApiProperty({ description: 'Nombres completos del cliente', example: 'Juan Pérez' })
  @IsNotEmpty()
  nombres: string;

  @ApiProperty({ description: 'Número de celular del cliente', example: '3001234567' })
  @IsNotEmpty()
  celular: string;

  @ApiProperty({ description: 'Correo electrónico del cliente', example: 'juan.perez@example.com' })
  @IsEmail()
  email: string;
}
