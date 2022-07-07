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
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';
import { JobApplicationService } from './job-application.service';

@Controller('job-applications')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly authService: AuthService,
  ) {}

  @Post('apply')
  createJobApplication(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    return this.jobApplicationService.createJobApplication(
      createJobApplicationDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getJobApplications(
    @Headers('Authorization') auth: string,
  ): Promise<JobApplication[]> {
    const json = this.authService.decodeToken(auth);

    return this.jobApplicationService.getJobApplications();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getJobApplication(@Param('id') id: number): Promise<JobApplication> {
    return this.jobApplicationService.getJobApplicationById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  updateJobApplication(
    @Param('id') id: number,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ): Promise<JobApplication> {
    return this.jobApplicationService.updateJobApplication(
      +id,
      updateJobApplicationDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteJobApplication(@Param('id') id: number): Promise<JobApplication> {
    return this.jobApplicationService.deleteJobApplication(id);
  }
}
