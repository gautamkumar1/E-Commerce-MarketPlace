/* eslint-disable prettier/prettier */
export class CreateReviewDto {
  readonly rating: number;
  readonly comment: string;
  readonly name: string;
}

export class UpdateReviewDto {
  readonly rating?: number;
  readonly comment?: string;
  readonly name?: string;
}
