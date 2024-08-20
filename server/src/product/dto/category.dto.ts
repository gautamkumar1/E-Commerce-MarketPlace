/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  parentCategory?: string; // Optional parent category for hierarchical categories
}
