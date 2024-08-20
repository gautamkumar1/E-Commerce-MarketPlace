/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Buyer, BuyerSchema } from 'src/auth/schema/buyer.schema';
import { Seller, SellerSchema } from 'src/auth/schema/seller.schema';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseLoggerService } from './database-logger.service';
import { EmailService } from './auth-email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Buyer.name, schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    EmailService,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1D' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, DatabaseLoggerService],
  controllers: [AuthController],
})
export class AuthModule {}
