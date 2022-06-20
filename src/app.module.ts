import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { CvModule } from './cv/cv.module';
import { JobPostModule } from './job-post/job-post.module';
import { JobCategoryModule } from './job-category/job-category.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import config from '../ormconfig';
import { JobApplicationModule } from './job-application/job-application.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    RoleModule,
    JobApplicationModule,
    CvModule,
    JobPostModule,
    JobCategoryModule,
    BlogPostModule,
    BlogCategoryModule,
    UserModule,
    ProfileModule,
    AuthModule,
    FileUploadModule,
  ],
})
export class AppModule {}
