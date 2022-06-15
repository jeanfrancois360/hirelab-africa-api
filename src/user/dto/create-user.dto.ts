import { IsEmail, IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateUserDto {
  @Length(3, 100)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Length(3, 100)
  @IsNotEmpty()
  readonly password: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly role_id: number;
}
