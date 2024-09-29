import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

@Injectable()
export class ApiService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = `${process.env.DB_API_URL}`;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
