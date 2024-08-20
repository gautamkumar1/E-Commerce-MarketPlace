/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from '../controller/cart.controller';
import { CartService } from '../service/cart.service';
import { Cart, CartSchema } from '../schema/cart.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]), // Import the Cart schema
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
