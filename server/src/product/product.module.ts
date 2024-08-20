/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductService } from './logic/product.service';
import { ProductController } from './logic/product.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),

  ],
  providers: [ProductService], 
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
