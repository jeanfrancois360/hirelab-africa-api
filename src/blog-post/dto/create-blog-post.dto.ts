import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateBlogPostDto {
  @Length(3, 100)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  blog_category_id: number;

  @IsInt()
  @Min(1)
  author: number;
}
