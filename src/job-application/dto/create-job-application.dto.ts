import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  Length,
  Min,
} from 'class-validator';

export enum StatusEnum {
  ACCEPT = 'accept',
  REJECT = 'reject',
  PENDING = 'pending',
}

export class CreateJobApplicationDto {
  @Length(3, 100)
  @IsNotEmpty()
  first_name: string;

  @Length(3, 100)
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @Length(3, 100)
  @IsNotEmpty()
  email: string;

  @Length(3, 16)
  @IsNotEmpty()
  phone: string;

  @Length(3, 100)
  @IsNotEmpty()
  address: string;

  @Length(2, 100)
  @IsNotEmpty()
  city: string;

  @Length(3, 100)
  @IsNotEmpty()
  country: string;

  @Length(2, 100)
  @IsNotEmpty()
  postcode: string;

  @IsNotEmpty()
  cover_letter: string;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  user_id: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  job_post: string;
}
