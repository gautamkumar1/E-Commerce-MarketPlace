import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './auth-email.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Buyer } from './schema/buyer.schema';
import { Seller } from './schema/seller.schema';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let buyerModel: any;
  let sellerModel: any;
  let emailService: EmailService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        JwtService,
        EmailService,
        {
          provide: getModelToken(Buyer.name),
          useValue: {
            findOne: jest.fn(),
            exists: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(Seller.name),
          useValue: {
            findOne: jest.fn(),
            exists: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendPasswordResetEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    buyerModel = module.get(getModelToken(Buyer.name));
    sellerModel = module.get(getModelToken(Seller.name));
    emailService = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerBuyer', () => {
    it('should throw an error if required fields are missing', async () => {
      await expect(
        service.registerBuyer({
          email: '',
          username: '',
          password: '',
          phone: '',
          address: '',
        }),
      ).rejects.toThrow(
        new HttpException('Please fill all required fields', HttpStatus.BAD_REQUEST),
      );
    });

    it('should hash the password and save a new buyer', async () => {
      const createBuyerDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
        phone: '1234567890',
        address: '123 Test St',
      };

      buyerModel.findOne.mockResolvedValue(null); // No existing buyer
      const hashedPassword = await bcrypt.hash(createBuyerDto.password, 10);
      buyerModel.create.mockResolvedValue({
        ...createBuyerDto,
        password: hashedPassword,
      });

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

      const result = await service.registerBuyer(createBuyerDto);
      expect(result).toEqual({ ...createBuyerDto, password: hashedPassword });
      expect(buyerModel.findOne).toHaveBeenCalledWith({ email: createBuyerDto.email });
      expect(buyerModel.create).toHaveBeenCalledWith({
        ...createBuyerDto,
        password: hashedPassword,
      });
    });
  });

  describe('validateUser', () => {
    it('should throw an error if fields are missing', async () => {
      await expect(service.validateUser('', '', 'buyer')).rejects.toThrow(
        new HttpException('Please fill out all input fields properly.', HttpStatus.BAD_REQUEST),
      );
    });

    it('should return the user if validation is successful', async () => {
      const user = { email: 'test@test.com', password: 'password123' };
      const buyer = { ...user, _id: '1', username: 'buyerUser' };
      
      buyerModel.findOne.mockResolvedValue(buyer);
      buyerModel.exists.mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validateUser(user.email, user.password, 'buyer');
      expect(result).toEqual(buyer);
    });

    it('should throw an error if the password is incorrect', async () => {
      const user = { email: 'test@test.com', password: 'password123' };
      const buyer = { ...user, _id: '1', username: 'buyerUser' };

      buyerModel.findOne.mockResolvedValue(buyer);
      buyerModel.exists.mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.validateUser(user.email, user.password, 'buyer')).rejects.toThrow(
        new HttpException('Password is incorrect.', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user = { _id: '1', username: 'testuser', email: 'test@test.com', phone: '1234567890', address: '123 Test St', roles: ['buyer'] };
      const token = 'jwt_token';

      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(user);
      expect(result).toEqual({ token });
    });
  });

  describe('updateBuyer', () => {
    it('should throw an error if the buyer is not found', async () => {
      const updateDto = { username: 'updatedUser' };
      buyerModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.updateBuyer('nonexistentId', updateDto)).rejects.toThrow(
        new HttpException('Buyer not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should update and return the buyer details', async () => {
      const existingBuyer = { _id: '1', email: 'test@test.com', username: 'oldUser' };
      const updateDto = { username: 'updatedUser' };
      const updatedBuyer = { ...existingBuyer, ...updateDto };

      buyerModel.findByIdAndUpdate.mockResolvedValue(updatedBuyer);

      const result = await service.updateBuyer('1', updateDto);
      expect(result).toEqual(updatedBuyer);
      expect(buyerModel.findByIdAndUpdate).toHaveBeenCalledWith('1', updateDto, { new: true });
    });
  });

  describe('updateSeller', () => {
    it('should throw an error if the seller is not found', async () => {
      const updateDto = { username: 'updatedSeller' };
      sellerModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.updateSeller('nonexistentId', updateDto)).rejects.toThrow(
        new HttpException('Seller not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should update and return the seller details', async () => {
      const existingSeller = { _id: '1', email: 'seller@test.com', username: 'oldSeller' };
      const updateDto = { username: 'updatedSeller' };
      const updatedSeller = { ...existingSeller, ...updateDto };

      sellerModel.findByIdAndUpdate.mockResolvedValue(updatedSeller);

      const result = await service.updateSeller('1', updateDto);
      expect(result).toEqual(updatedSeller);
      expect(sellerModel.findByIdAndUpdate).toHaveBeenCalledWith('1', updateDto, { new: true });
    });
  });

  describe('generatePasswordResetToken', () => {
    it('should throw an error if the user is not found', async () => {
      const email = 'test@test.com';
      const userType = 'buyer';

      buyerModel.findOne.mockResolvedValue(null);

      await expect(service.generatePasswordResetToken(email, userType)).rejects.toThrow(
        new HttpException('No user found with this email.', HttpStatus.BAD_REQUEST),
      );
    });

    it('should generate a password reset token and send email', async () => {
      const email = 'test@test.com';
      const userType = 'buyer';
      const user = { _id: '1', email };
      const token = 'jwt_token';

      buyerModel.findOne.mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      emailService.sendPasswordResetEmail = jest.fn().mockResolvedValue(undefined);

      const result = await service.generatePasswordResetToken(email, userType);
      expect(result).toEqual({ message: 'Password reset email sent', token });
      expect(jwtService.sign).toHaveBeenCalled();
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith(email, token);
    });
  });

  describe('resetPassword', () => {
    it('should throw an error if no user is found with the email', async () => {
      const email = 'test@test.com';
      const newPassword = 'newpassword123';

      buyerModel.findOneAndUpdate.mockResolvedValue(null);
      sellerModel.findOneAndUpdate.mockResolvedValue(null);

      await expect(service.resetPassword(email, newPassword)).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should update the password for the user', async () => {
      const email = 'test@test.com';
      const newPassword = 'newpassword123';
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = { email, password: hashedPassword };

      buyerModel.findOneAndUpdate.mockResolvedValue(updatedUser);
      sellerModel.findOneAndUpdate.mockResolvedValue(null);

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

      const result = await service.resetPassword(email, newPassword);
      expect(result).toEqual({ message: 'Password successfully updated' });
      expect(buyerModel.findOneAndUpdate).toHaveBeenCalledWith(
        { email },
        { password: hashedPassword },
        { new: true },
      );
      expect(sellerModel.findOneAndUpdate).not.toHaveBeenCalled();
    });
  });
});
