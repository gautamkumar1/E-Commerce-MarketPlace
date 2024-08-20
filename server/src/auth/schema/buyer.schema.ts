/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type BuyerDocument = Buyer & Document;

@Schema()
export class Buyer {
  @Prop({ 
    required: true, 
    minlength: 6, 
    trim: true 
  })
  username: string;

  @Prop({ 
    required: true, 
    unique: true, 
    minlength: 8, 
    trim: true 
  })
  email: string;

  @Prop({ 
    required: true, 
    minlength: 10, 
    trim: true 
  })
  phone: string;

  @Prop({ 
    required: true, 
    trim: true 
  })
  address: string;

  @Prop({ 
    required: true, 
    minlength: 6 
  })
  password: string;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
