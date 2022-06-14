import { IsEnum, IsNotEmpty, Length } from 'class-validator';

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateRoleDto {
  @Length(3, 100)
  @IsNotEmpty()
  name: string;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;
}
