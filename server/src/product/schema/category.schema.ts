/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
  subCategories: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
