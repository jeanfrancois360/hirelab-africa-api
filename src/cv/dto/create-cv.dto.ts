import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateCvDto {
  @Length(3, 100)
  @IsNotEmpty()
  readonly file: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly candidate: number;
}
