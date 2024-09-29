import { IsString } from 'class-validator';

export class ValidateClientDto {
  @IsString()
  documento: string;

  @IsString()
  celular: string;
}
