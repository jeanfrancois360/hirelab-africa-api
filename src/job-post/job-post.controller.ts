import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { IUserInfo } from 'src/interfaces';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { UpdateJobPostDto } from './dto/update-job-post.dto';
import { JobPost } from './entities/job-post.entity';
import { JobPostService } from './job-post.service';

@Controller('job-posts')
export class JobPostController {
  constructor(
    private readonly jobPostService: JobPostService,
    private readonly authService: AuthService,
  ) {}

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
  async updateJobPost(
    @Param('id') id: number,
    @Body() updateJobPostDto: UpdateJobPostDto,
    @Headers('Authorization') auth: string,
  ): Promise<JobPost> {
    const userInfo = await this.authService.decodeToken(auth).then((result) => {
      return result;
    });
    const data = Object(userInfo);
    console.log(data);

    return this.jobPostService.updateJobPost(+id, updateJobPostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteJobPost(@Param('id') id: number): Promise<JobPost> {
    return this.jobPostService.deleteJobPost(id);
  }
}
