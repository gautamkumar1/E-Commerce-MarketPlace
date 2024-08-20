/* eslint-disable prettier/prettier */

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';


@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.createOrder(createOrderDto);
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    try {
      const paymentIntent = await this.orderService.createStripePaymentIntent(amount, 'usd');
      return paymentIntent;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
