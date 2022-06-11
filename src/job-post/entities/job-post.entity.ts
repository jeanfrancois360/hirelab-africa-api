import { JobApplication } from 'src/job-application/entities/job-application.entity';
import { JobCategory } from 'src/job-category/entities/job-category.entity';
import { User } from 'src/user/entities/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StatusOptions {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TypeOptions {
  FULLTIME = 'Full-time',
  PARTTIME = 'Part-time',
  CONTRACT = 'Contract',
  TEMPORARY = 'Temporary',
  VOLUNTEER = 'Volunteer',
  INTERNSHIP = 'Internship',
}

export enum WorkSpaceOptions {
  REMOTE = 'Remote',
  ONSITE = 'On-site',
}

@Entity()
export class JobPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  salary_range: string;

  @Column({
    type: 'enum',
    enum: TypeOptions,
  })
  type: TypeOptions;

  @Column({
    type: 'enum',
    enum: WorkSpaceOptions,
  })
  workspace: WorkSpaceOptions;

  @Column({
    type: 'enum',
    enum: StatusOptions,
    default: StatusOptions.INACTIVE,
  })
  status: StatusOptions;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  update_at: Date;

  @OneToOne(() => JobCategory, (job_category) => job_category.job_post) // specify inverse side as a second parameter
  @JoinColumn({ name: 'job_category_id' })
  job_category: JobCategory;

  @ManyToOne(() => User, (user) => user.job_post) // specify inverse side as a second parameter
  @JoinColumn({ name: 'posted_by' })
  user: User;

  @OneToMany(() => JobApplication, (job_post) => job_post.job_post)
  job_application: JobApplication;
}
