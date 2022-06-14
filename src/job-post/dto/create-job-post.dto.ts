import { IsEnum, IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TypeEnum {
  FULLTIME = 'Full-time',
  PARTTIME = 'Part-time',
  CONTRACT = 'Contract',
  TEMPORARY = 'Temporary',
  VOLUNTEER = 'Volunteer',
  INTERNSHIP = 'Internship',
}

export enum WorkSpaceEnum {
  REMOTE = 'Remote',
  ONSITE = 'On-site',
}

export class CreateJobPostDto {
  @Length(3, 100)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @Length(1, 30)
  @IsNotEmpty()
  salary_range: string;

  @IsEnum(TypeEnum)
  @IsNotEmpty()
  type: TypeEnum;

  @IsEnum(WorkSpaceEnum)
  @IsNotEmpty()
  workspace: WorkSpaceEnum;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  job_category_id: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  posted_by: number;
}
