/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: true })
  available: boolean;

  @Prop({ required: true })
  sellername: string;

  @Prop({ required: true })
  shopname: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
