/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from '../dto/review.dto';
import { Review } from '../schema/review.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/role.enum';


@Controller('api/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // POST /reviews - Create a new review
   @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':productId')
  async createReview(
    @Param('productId') productId: string, // Extract productId from the URL
    @Request() req,  // Extract user information from JWT
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const userId = req.user.userId; // Extract userId from JWT token
    return this.reviewService.createReview(createReviewDto, productId, userId); // Pass productId and userId to the service
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('getAllReviews')
  getAllReviews() {
    return this.reviewService.getAllReviews();
  }
  // GET /reviews/:productId - Get all reviews for a specific product
  @Get(':productId')
  async getReviewsByProductId(@Param('productId') productId: string): Promise<Review[]> {
    return this.reviewService.getReviewsByProductId(productId);
  }

  // PATCH /reviews/:id - Update a review by ID
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  @Roles(UserRole.Seller)
  async updateReview(
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  // DELETE /reviews/:id - Delete a review by ID
  @UseGuards(JwtAuthGuard,RolesGuard)

  @Delete(':id')
  @Roles(UserRole.Seller)
  async deleteReview(@Param('id') reviewId: string): Promise<void> {
    return this.reviewService.deleteReview(reviewId);
  }
}
