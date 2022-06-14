import { BlogCategory } from 'src/blog-category/entities/blog-category.entity';
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

export enum StatusOptions {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

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

  @OneToOne(() => BlogCategory, (blog_category) => blog_category.blog_post) // specify inverse side as a second parameter
  @JoinColumn({ name: 'blog_category_id' })
  blog_category: BlogCategory;

  @ManyToOne(() => User, (user) => user.blog_post) // specify inverse side as a second parameter
  @JoinColumn({ name: 'author' })
  user: User;
}
