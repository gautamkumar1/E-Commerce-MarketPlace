/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Buyer, BuyerDocument } from 'src/auth/schema/buyer.schema';

import { HttpException, HttpStatus } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { EmailService } from './auth-email.service';
import { UserRole } from './role.enum';

import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Seller, SellerDocument } from './schema/seller.schema';
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private emailService: EmailService,
    @InjectModel(Buyer.name) private buyerModel: Model<BuyerDocument>,
    @InjectModel(Seller.name) private sellerModel: Model<SellerDocument>,
    
  ) {}

  //********** REGISTER BUYER *****************
  async registerBuyer(createBuyerDto: any): Promise<Buyer> {
    // Check if all required fields are provided
    if (
      !createBuyerDto.email ||
      !createBuyerDto.username ||
      !createBuyerDto.password ||
      !createBuyerDto.phone ||
      !createBuyerDto.address
    ) {
      throw new HttpException(
        'Please fill all required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the username meets the minimum length requirement
    if (createBuyerDto.username.length < 6) {
      throw new HttpException(
        'Username should be at least 6 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the password meets the minimum length requirement
    if (createBuyerDto.password.length < 6) {
      throw new HttpException(
        'Password should be at least 6 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the email meets the minimum length requirement
    if (createBuyerDto.email.length < 8) {
      throw new HttpException(
        'Email should be at least 8 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the phone meets the minimum length requirement
    if (createBuyerDto.phone.length < 10) {
      throw new HttpException(
        'Phone number should be at least 10 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if a buyer with the same email already exists
    const existingBuyer = await this.buyerModel.findOne({ email: createBuyerDto.email });
    if (existingBuyer) {
      throw new HttpException(
        'User with this email is already registered.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(createBuyerDto.password, 10);
  
    // Create a new buyer with the hashed password
    const createdBuyer = new this.buyerModel({ ...createBuyerDto, password: hashedPassword });
  
    // Save the new buyer to the database and return it
    return createdBuyer.save();
  }

  //********** REGISTER SELLER *****************
  async registerSeller(createSellerDto: any): Promise<Seller> {
    // Check if all required fields are provided
    if (
      !createSellerDto.email ||
      !createSellerDto.username ||
      !createSellerDto.password ||
      !createSellerDto.phone ||
      !createSellerDto.address ||
      !createSellerDto.shopname
    ) {
      throw new HttpException(
        'Please fill all required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the username meets the minimum length requirement
    if (createSellerDto.username.length < 6) {
      throw new HttpException(
        'Username should be at least 6 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the password meets the minimum length requirement
    if (createSellerDto.password.length < 6) {
      throw new HttpException(
        'Password should be at least 6 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the email meets the minimum length requirement
    if (createSellerDto.email.length < 8) {
      throw new HttpException(
        'Email should be at least 8 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the phone meets the minimum length requirement
    if (createSellerDto.phone.length < 10) {
      throw new HttpException(
        'Phone number should be at least 10 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if the shopname meets the minimum length requirement
    if (createSellerDto.shopname.length < 3) {
      throw new HttpException(
        'Shop name should be at least 3 characters long.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Check if a seller with the same email already exists
    const existingSeller = await this.sellerModel.findOne({ email: createSellerDto.email });
    if (existingSeller) {
      throw new HttpException(
        'User with this email is already registered.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(createSellerDto.password, 10);
  // Set the roles (default to ['seller'] if no roles provided)
  const roles = createSellerDto.roles && createSellerDto.roles.length > 0
  ? createSellerDto.roles
  : [UserRole.Seller];


    // Create a new seller with the hashed password
    const createdSeller = new this.sellerModel({ ...createSellerDto, password: hashedPassword },roles);
  
    // Save the new seller to the database and return it
    return createdSeller.save();
  }
  
//********** Validate User *****************
async validateUser(
  email: string,
  password: string,
  userType: 'buyer' | 'seller',
): Promise<any> {
  // Check if all fields are provided
  if (!email || !password || !userType) {
    throw new HttpException(
      'Please fill out all input fields properly.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Validate userType
  if (userType !== 'buyer' && userType !== 'seller') {
    throw new HttpException(
      'Please enter the correct role: buyer or seller.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Find the user based on the userType
  const user =
    userType === 'buyer'
      ? await this.buyerModel.findOne({ email })
      : await this.sellerModel.findOne({ email });

  // If no user is found with the given email
  if (!user) {
    throw new HttpException(
      'No user found with this email.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // If the userType does not match the found user
  if (userType === 'buyer' && !await this.buyerModel.exists({ email })) {
    throw new HttpException(
      'User with role "buyer" not found.',
      HttpStatus.BAD_REQUEST,
    );
  } else if (userType === 'seller' && !await this.sellerModel.exists({ email })) {
    throw new HttpException(
      'User with role "seller" not found.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // If the password is incorrect
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new HttpException(
      'Password is incorrect.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // If everything is correct, return the user
  return user;
}

  //********** Login  *****************
  async login(user: any) {
    const payload = { username: user.username, userId: user._id,email:user.email,phone:user.phone,address:user.address,roles:user.roles};
    return {
      token: this.jwtService.sign(payload),
    };
  }

  //********** UPDATE BUYER *****************
  async updateBuyer(userId: string, updateBuyerDto: UpdateBuyerDto): Promise<Buyer> {
    const updatedBuyer = await this.buyerModel.findByIdAndUpdate(userId, updateBuyerDto, { new: true });

    if (!updatedBuyer) {
      throw new HttpException('Buyer not found', HttpStatus.NOT_FOUND);
    }
    return updatedBuyer;
  }

  //********** UPDATE SELLER *****************
  async updateSeller(userId: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    
    
    const updatedSeller = await this.sellerModel.findByIdAndUpdate(userId, updateSellerDto, { new: true });

    if (!updatedSeller) {
      throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    return updatedSeller;
  }

   //********** PASSWORD REST-TOKEN *****************
    
   async generatePasswordResetToken(email: string, userType: 'buyer' | 'seller') {
    const user =
      userType === 'buyer'
        ? await this.buyerModel.findOne({ email })
        : await this.sellerModel.findOne({ email });

    if (!user) {
      throw new HttpException('No user found with this email.', HttpStatus.BAD_REQUEST);
    }

    const payload = { userId: user._id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: '15m',
    });

    await this.emailService.sendPasswordResetEmail(email, token);

    return {message:"Password reset email sent",
      token:token
    };
  }

  //********** RESET PASSWORD *****************
  async resetPassword(email: string, newPassword: string) {
    
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.buyerModel.findOneAndUpdate( { email: email }, { password: hashedPassword }, { new: true })
      || await this.sellerModel.findOneAndUpdate( { email: email }, { password: hashedPassword }, { new: true });

    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Password successfully updated',
    }
  }
}
