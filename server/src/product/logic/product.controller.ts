/* eslint-disable prettier/prettier */
// src/product/product.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/role.enum';
import { Product } from '../schema/product.schema'; 
import { Types } from 'mongoose';
@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('create')
  @Roles(UserRole.Seller)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('getAllProducts')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    // console.log("product id: " + id);
    
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID format');
    }
    return this.productService.getProductById(id);
  }

  // Update product
  
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Put(':id')
  @Roles(UserRole.Seller)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }


  // Delete product
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  @Roles(UserRole.Seller)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  // Search and filter products
  @Get('search')
  async searchProducts(@Query() query: any): Promise<Product[]> {
    
    return this.productService.searchProducts(query);
  }
}
