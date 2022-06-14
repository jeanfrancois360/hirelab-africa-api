import { JobPost } from 'src/job-post/entities/job-post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StatusEnum {
  ACCEPT = 'accept',
  REJECT = 'reject',
  PENDING = 'pending',
}

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  postcode: string;

  @Column('text')
  cover_letter: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

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
  updated_at: Date;

  @OneToOne(() => User, (JobApplication) => JobApplication.job_application)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => JobPost, (JobApplication) => JobApplication.job_application)
  @JoinColumn({ name: 'job_post_id' })
  job_post: JobPost;
}
