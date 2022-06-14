import { IsEmail, IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateUserDto {
  @Length(3, 100)
  @IsNotEmpty()
  username: string;

  @Length(3, 100)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 100)
  @IsNotEmpty()
  password: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  role_id: number;
}
