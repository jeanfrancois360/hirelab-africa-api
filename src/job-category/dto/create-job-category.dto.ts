import { IsNotEmpty, Length } from 'class-validator';

export class CreateJobCategoryDto {
  @Length(3, 100)
  @IsNotEmpty()
  name: string;
}
