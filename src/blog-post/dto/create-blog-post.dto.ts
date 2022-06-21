import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateBlogPostDto {
  @Length(3, 100)
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly image: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly blog_category_id: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly author: number;
}
