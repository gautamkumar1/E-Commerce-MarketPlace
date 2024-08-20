/* eslint-disable prettier/prettier */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseLoggerService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseLoggerService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.once('open', () => {
      this.logger.log('Database connected successfully');
    });

    this.connection.on('error', (error) => {
      this.logger.error('Database connection error', error.stack);
    });
  }
}
