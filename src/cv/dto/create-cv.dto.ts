import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateCvDto {
  @Length(3, 100)
  @IsNotEmpty()
  file: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  candidate: number;
}
