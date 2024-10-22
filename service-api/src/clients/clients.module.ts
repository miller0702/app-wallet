import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from 'api/api.service';

@Module({
  imports: [HttpModule],
  providers: [ClientsService, ApiService],
  controllers: [ClientsController]
})
export class ClientsModule {}
