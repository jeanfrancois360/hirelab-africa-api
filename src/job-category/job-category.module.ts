import { Module } from '@nestjs/common';
import { JobCategoryController } from './job-category.controller';
import { JobCategoryService } from './job-category.service';

@Module({
  controllers: [JobCategoryController],
  providers: [JobCategoryService],
})
export class JobCategoryModule {}
