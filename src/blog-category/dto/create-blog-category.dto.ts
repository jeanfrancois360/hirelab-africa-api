import { IsNotEmpty, Length } from 'class-validator';

export class CreateBlogCategoryDto {
  @Length(3, 100)
  @IsNotEmpty()
  readonly name: string;
}
