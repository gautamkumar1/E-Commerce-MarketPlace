/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;  // Automatically handled in service

  @Prop([{
    productId: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }])
  items: Array<{
    productId: Types.ObjectId;  // Automatically handled in service
    quantity: number;  // Entered by the user
  }>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
