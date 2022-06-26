import { IsNotEmpty, Length } from 'class-validator';

export class CreateBlogCategoryDto {
  @Length(2, 100)
  @IsNotEmpty()
  readonly name: string;
}
