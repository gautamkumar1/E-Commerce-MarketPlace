/* eslint-disable prettier/prettier */

import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Order, OrderDocument } from '../schema/order.schema';

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject('STRIPE_SECRET_KEY') private stripeSecretKey: string,
  ) {
    this.stripe = new Stripe(this.stripeSecretKey, {
      apiVersion: '2024-06-20',
    });
  }

  async createOrder(orderData: any): Promise<OrderDocument> {
    const session = await this.orderModel.db.startSession();
    session.startTransaction();

    try {
      const order = new this.orderModel(orderData);
      await order.save({ session });

      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Order creation failed');
    } finally {
      session.endSession();
    }
  }

  async createStripePaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
}
