/* eslint-disable prettier/prettier */
import { Controller, Post, Patch, Delete, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { AddToCartDto, UpdateCartDto } from '../dto/cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/cart')
@UseGuards(JwtAuthGuard)  
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // GET /cart - Get current user's cart
  @Get()
  async getCart(@Req() req: any) {
    const userId = req.user.userId; // Assuming req.user contains authenticated user's details
    return this.cartService.getCartByUserId(userId);
  }

  // POST /cart - Add product to cart
  @Post()
  async addToCart(@Req() req: any, @Body() addToCartDto: AddToCartDto) {
    const userId = req.user.userId; // Get authenticated user's ID
    return this.cartService.addToCart(userId, addToCartDto);
  }

  // PATCH /cart - Update product quantity in cart
  @Patch()
  async updateCart(@Req() req: any, @Body() updateCartDto: UpdateCartDto) {
    const userId = req.user.userId;
    return this.cartService.updateCart(userId, updateCartDto);
  }

  // DELETE /cart/:productId - Remove product from cart
  @Delete(':productId')
  async removeFromCart(@Req() req: any, @Param('productId') productId: string) {
    const userId = req.user.userId;
    return this.cartService.removeFromCart(userId, productId);
  }
}
