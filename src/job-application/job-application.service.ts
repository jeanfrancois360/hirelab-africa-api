import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPostService } from 'src/job-post/job-post.service';
import { UserService } from 'src/user/user.service';
import { uuidGen } from 'src/utils/uuid-gen';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
    private readonly userService: UserService,
    private readonly jobPostService: JobPostService,
  ) {}

  async createJobApplication(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    try {
      const jobPost = await this.jobPostService.getJobPostById(
        createJobApplicationDto.job_post_id,
      );
      if (jobPost) throw new ConflictException(`BlogCategory not found!`);

      const candidate = await this.userService.getUserById(
        createJobApplicationDto.candidate,
      );
      if (candidate) throw new ConflictException(`User not found`);
      const newJobApplication = this.jobApplicationRepository.create(
        createJobApplicationDto,
      );
      newJobApplication.uuid = uuidGen();
      newJobApplication.job_post = jobPost;
      newJobApplication.user = candidate;
      return await this.jobApplicationRepository.save(newJobApplication);
    } catch (error) {
      throw error;
    }
  }

  async getJobApplications(): Promise<JobApplication[]> {
    try {
      return await this.jobApplicationRepository.find({
        order: { id: 'DESC' },
      });
    } catch (error) {
      throw error;
    }
  }

  async getJobApplicationById(id: number): Promise<JobApplication> {
    try {
      const jobApplication = await this.jobApplicationRepository.findOneBy({
        id: id,
      });
      if (!jobApplication)
        throw new NotFoundException(`JobApplication not found!`);
      return jobApplication;
    } catch (error) {
      throw error;
    }
  }

  async updateJobApplication(
    id: number,
    updateJobApplicationDto: UpdateJobApplicationDto,
  ): Promise<JobApplication> {
    try {
      const jobApplication = await this.getJobApplicationById(id);
      if (!jobApplication)
        throw new NotFoundException(`JobApplication not found!`);
      jobApplication.status = updateJobApplicationDto.status;
      return this.jobApplicationRepository.save(jobApplication);
    } catch (error) {
      throw error;
    }
  }

  async deleteJobApplication(id: number): Promise<JobApplication> {
    try {
      const jobApplication = await this.getJobApplicationById(id);
      if (!jobApplication)
        throw new NotFoundException(`JobApplication not found!`);
      return this.jobApplicationRepository.remove(jobApplication);
    } catch (error) {
      throw error;
    }
  }
}
