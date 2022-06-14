import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateProfileDto {
  @Length(3, 100)
  first_name: string;

  @Length(3, 100)
  last_name: string;

  @Length(3, 100)
  company_name: string;

  @Length(3, 100)
  company_description: string;

  @Length(3, 100)
  @IsNotEmpty()
  email: string;

  @Length(3, 100)
  phone: string;

  @Length(3, 100)
  address: string;

  @Length(3, 100)
  city: string;

  @Length(3, 100)
  country: string;

  @Length(3, 100)
  postcode: string;

  @Length(3, 100)
  avatar: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  user_id: string;
}
