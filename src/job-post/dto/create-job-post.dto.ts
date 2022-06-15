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
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @Length(1, 30)
  @IsNotEmpty()
  readonly salary_range: string;

  @IsEnum(TypeEnum)
  @IsNotEmpty()
  readonly type: TypeEnum;

  @IsEnum(WorkSpaceEnum)
  @IsNotEmpty()
  readonly workspace: WorkSpaceEnum;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  readonly status: StatusEnum;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly job_category_id: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly posted_by: number;
}
