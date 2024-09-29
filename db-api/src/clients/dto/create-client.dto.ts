import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  documento: string;

  @IsNotEmpty()
  nombres: string;

  @IsNotEmpty()
  celular: string;

  @IsEmail()
  email: string;
}
