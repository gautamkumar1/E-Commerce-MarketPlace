/* eslint-disable prettier/prettier */

import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.createOrder(createOrderDto);
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @UseGuards(JwtAuthGuard)
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
