/* eslint-disable prettier/prettier */
// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Order, OrderSchema } from '../schema/order.schema';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ConfigModule,
  ],
  providers: [
    OrderService,
    {
      provide: 'STRIPE_SECRET_KEY',
      useFactory: (configService: ConfigService) => configService.get<string>('STRIPE_SECRET_KEY'),
      inject: [ConfigService],
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
