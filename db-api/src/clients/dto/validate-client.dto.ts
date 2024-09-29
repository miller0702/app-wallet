import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateClientDto {
  @ApiProperty({ description: 'Número de documento del cliente', example: '123456789' })
  @IsString()
  documento: string;

  @ApiProperty({ description: 'Número de celular del cliente', example: '3001234567' })
  @IsString()
  celular: string;
}
