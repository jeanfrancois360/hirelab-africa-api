import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CvModule } from './cv/cv.module';
import { ProfileModule } from './profile/profile.module';
import { JobPostModule } from './job-post/job-post.module';
import { JobCategoryModule } from './job-category/job-category.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import config from '../ormconfig';
import { JobApplicationModule } from './job-application/job-application.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    RoleModule,
    JobApplicationModule,
    CvModule,
    ProfileModule,
    JobPostModule,
    JobCategoryModule,
    BlogPostModule,
    BlogCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
