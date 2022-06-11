import { JobPost } from 'src/job-post/entities/job-post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StatusOptions {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class JobCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: StatusOptions,
    default: StatusOptions.ACTIVE,
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

  @OneToOne(() => JobPost, (job_post) => job_post.job_category) // specify inverse side as a second parameter
  job_post: JobPost;
}
