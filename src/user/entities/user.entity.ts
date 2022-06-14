import { BlogPost } from 'src/blog-post/entities/blog-post.entity';
import { Cv } from 'src/cv/entities/cv.entity';
import { JobApplication } from 'src/job-application/entities/job-application.entity';
import { JobPost } from 'src/job-post/entities/job-post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Profile, (user) => user.user)
  profile: Profile;

  @OneToOne(() => Cv, (user) => user.user)
  cv: Cv;

  @OneToMany(() => BlogPost, (blog_post) => blog_post.user)
  blog_post: BlogPost;

  @OneToOne(() => JobApplication, (user) => user.user)
  job_application: JobApplication;

  @OneToMany(() => JobPost, (blog_post) => blog_post.user)
  job_post: JobPost;
}
