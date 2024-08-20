/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Request, UseGuards, UnauthorizedException, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/buyer')
  async registerBuyer(@Body() createBuyerDto: any) {
    return this.authService.registerBuyer(createBuyerDto);
  }

  @Post('register/seller')
  async registerSeller(@Body() createSellerDto: any) {
    return this.authService.registerSeller(createSellerDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password, loginDto.userType);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('profile')
  @Roles(UserRole.Seller)
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/buyer')
  async updateBuyer(@Request() req, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.authService.updateBuyer(req.user.userId, updateBuyerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/seller')
  async updateSeller(@Request() req, @Body() updateSellerDto: UpdateSellerDto) {
    return this.authService.updateSeller(req.user.userId, updateSellerDto);
  }

  @Post('password-reset/request')
  async requestPasswordReset(@Body('email') email: string, @Body('userType') userType: 'buyer' | 'seller') {
    return this.authService.generatePasswordResetToken(email, userType);
  }

  @Post('password-reset/confirm')
  async resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string
  ) {
    return this.authService.resetPassword(email, newPassword);
  }
}
