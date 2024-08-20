/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from '../schema/cart.schema';
import { AddToCartDto, UpdateCartDto } from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  // Find a cart by user ID
  async getCartByUserId(userId: string): Promise<CartDocument> {
    return this.cartModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
  }

  // Add product to cart
  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<CartDocument> {
    const { productId, quantity } = addToCartDto;

    // Find the user's cart
    let cart = await this.getCartByUserId(userId);

    if (!cart) {
      // Create a new cart if none exists
      cart = new this.cartModel({
        userId: new Types.ObjectId(userId),
        items: [{ productId: new Types.ObjectId(productId), quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const productIndex = cart.items.findIndex(
        item => item.productId.toString() === productId,
      );

      if (productIndex > -1) {
        // Update the quantity if the product is already in the cart
        cart.items[productIndex].quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.items.push({ productId: new Types.ObjectId(productId), quantity });
      }
    }

    // Save the cart to the database
    return cart.save(); // This will now work since `cart` is a Mongoose document
  }

  // Update product quantity in cart
  async updateCart(userId: string, updateCartDto: UpdateCartDto): Promise<CartDocument> {
    const { productId, quantity } = updateCartDto;

    const cart = await this.getCartByUserId(userId);
    if (!cart) throw new NotFoundException('Cart not found');

    // Find the product in the cart
    const productIndex = cart.items.findIndex(
      item => item.productId.toString() === productId,
    );

    if (productIndex > -1) {
      // Update the product quantity
      cart.items[productIndex].quantity = quantity;
    } else {
      throw new NotFoundException('Product not found in cart');
    }

    // Save the updated cart to the database
    return cart.save();
  }

  // Remove product from cart
  async removeFromCart(userId: string, productId: string): Promise<CartDocument> {
    const cart = await this.getCartByUserId(userId);
    if (!cart) throw new NotFoundException('Cart not found');

    // Filter out the product to be removed
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId,
    );

    // Save the updated cart to the database
    return cart.save();
  }
}
