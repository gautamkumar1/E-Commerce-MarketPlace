/* eslint-disable prettier/prettier */
// Create DTO for adding/updating products in cart
export class AddToCartDto {
    readonly productId: string;
    readonly quantity: number;
  }
  
  // Update DTO for updating quantity
  export class UpdateCartDto {
    readonly productId: string;
    readonly quantity: number;
  }
  