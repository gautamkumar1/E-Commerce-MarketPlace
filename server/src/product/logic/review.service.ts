/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from '../schema/review.schema';
import { CreateReviewDto, UpdateReviewDto } from '../dto/review.dto';


@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

  // Create a new review
  async createReview(createReviewDto: CreateReviewDto, productId: string, userId: string): Promise<Review> {
    const reviewData = {
      ...createReviewDto,
      productId,
      userId
    };
    const createdReview = new this.reviewModel(reviewData);
    return createdReview.save();
  }

  // Get All Reviews
  async getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  // Get all reviews for a specific product
  async getReviewsByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId }).exec();
  }

  // Update a review by ID
  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const existingReview = await this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto, { new: true });
    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }
    return existingReview;
  }

  // Delete a review by ID
  async deleteReview(reviewId: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(reviewId).exec();
    if (!result) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }
  }
}
