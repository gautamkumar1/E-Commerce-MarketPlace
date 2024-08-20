/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // Default to 3000 if PORT is not set

  await app.listen(port);
  Logger.log(`🚀 Server started on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
