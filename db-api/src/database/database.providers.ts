// src/database/database.providers.ts
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  MongooseModule.forRoot(process.env.MONGODB_URI), 
];
