/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop()
  productId: string;

  @Prop()
  userId: string;

  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
