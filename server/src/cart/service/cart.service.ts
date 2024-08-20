/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from '../schema/cart.schema';
import { UpdateCartDto } from '../dto/cart.dto';

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
  async addToCart(userId: string, productId: string, quantity: number) {
    // Convert the productId to ObjectId
    const productObjectId = new Types.ObjectId(productId);

    // Find if cart already exists for the user
    let cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });

    if (cart) {
      // If cart exists, update the existing items or add a new item
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productObjectId));

      if (itemIndex > -1) {
        // If product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add a new item
        cart.items.push({ productId: productObjectId, quantity });
      }
    } else {
      // If no cart exists, create a new cart
      cart = new this.cartModel({
        userId: new Types.ObjectId(userId),
        items: [{ productId: productObjectId, quantity }],
      });
    }

    // Save the cart
    return cart.save();
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

  // Clear all items from the cart
  async clearCart(userId: string): Promise<CartDocument> {
    const cart = await this.getCartByUserId(userId);
    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = [];

    return cart.save();
  }
}
