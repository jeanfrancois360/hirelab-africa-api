import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { UpdateJobPostDto } from './dto/update-job-post.dto';
import { JobPost } from './entities/job-post.entity';
import { JobPostService } from './job-post.service';

@Controller('job-posts')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  createJobPost(@Body() createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    return this.jobPostService.createJobPost(createJobPostDto);
  }

  @Get()
  getJobPosts(): Promise<JobPost[]> {
    return this.jobPostService.getJobPosts();
  }

  @Get(':id')
  getJobPost(@Param('id') id: number): Promise<JobPost> {
    return this.jobPostService.getJobPostById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  updateJobPost(
    @Param('id') id: number,
    @Body() updateJobPostDto: UpdateJobPostDto,
  ): Promise<JobPost> {
    return this.jobPostService.updateJobPost(+id, updateJobPostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteJobPost(@Param('id') id: number): Promise<JobPost> {
    return this.jobPostService.deleteJobPost(id);
  }
}
