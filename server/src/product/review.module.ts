/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schema/review.schema';
import { ReviewController } from './logic/review.controller';
import { ReviewService } from './logic/review.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), // Register the Review schema
  ],
  controllers: [ReviewController], 
  providers: [ReviewService], 
  exports: [ReviewService], 
})
export class ReviewModule {}
