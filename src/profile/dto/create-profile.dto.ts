import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateProfileDto {
  @Length(3, 100)
  readonly first_name: string;

  @Length(3, 100)
  readonly last_name: string;

  @Length(3, 100)
  readonly company_name: string;

  @Length(3, 100)
  readonly company_description: string;

  @Length(3, 100)
  @IsNotEmpty()
  readonly email: string;

  @Length(3, 100)
  readonly phone: string;

  @Length(3, 100)
  readonly address: string;

  @Length(3, 100)
  readonly city: string;

  @Length(3, 100)
  readonly country: string;

  @Length(3, 100)
  readonly postcode: string;

  @Length(3, 100)
  readonly avatar: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly user_id: string;
}
