/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schema/product.schema';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dgsr2ti0d',
  api_key: '896965796646882',
  api_secret: 'hxSgqTWbhwI24brji5rvvJB_Vjc',
});

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  // ************* CREATE PRODUCT **************** //
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  // ************* GET ALL PRODUCT **************** //
  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // ************* GET PRODUCT BY ID **************** //
  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // ************* UPDATE PRODUCT **************** //
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  // ************* DELETE PRODUCT **************** //
  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }

  // ************* SEARCH AND FILTER PRODUCT **************** //
  async searchProducts(query: any): Promise<Product[]> {
    const searchCriteria: any = {};

    // Search by name or description
    if (query.search) {
      searchCriteria.$or = [
        { name: { $regex: query.search, $options: 'i' } }, // case-insensitive search
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (query.category) {
      searchCriteria.category = query.category;
    }

    // Filter by price range
    if (query.minPrice || query.maxPrice) {
      searchCriteria.price = {};
      if (query.minPrice) {
        searchCriteria.price.$gte = Number(query.minPrice);
      }
      if (query.maxPrice) {
        searchCriteria.price.$lte = Number(query.maxPrice);
      }
    }

    // Filter by availability
    if (query.available) {
      searchCriteria.available = query.available === 'true';
    }

    // Filter by rating
    if (query.minRating) {
      searchCriteria.rating = { $gte: Number(query.minRating) };
    }

    
    
    // Return products based on search and filter criteria
    return this.productModel.find(searchCriteria).exec();
  }
  // ************* UPLOAD PRODUCT IMAGE **************** //
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  }
}
