import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { slugifyConstants } from 'src/constants';
import { uuidGen } from 'src/utils/uuid-gen';
import { Repository } from 'typeorm';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { JobCategory } from './entities/job-category.entity';

@Injectable()
export class JobCategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
  ) {}
  async createJobCategory(
    createJobCategoryDto: CreateJobCategoryDto,
  ): Promise<JobCategory> {
    try {
      const newJobCategory =
        this.jobCategoryRepository.create(createJobCategoryDto);
      newJobCategory.slug = slugify(newJobCategory.name, slugifyConstants);
      newJobCategory.uuid = uuidGen();
      return await this.jobCategoryRepository.save(newJobCategory);
    } catch (error) {
      throw error;
    }
  }

  async getJobCategories(): Promise<JobCategory[]> {
    try {
      return await this.jobCategoryRepository.find({ order: { id: 'DESC' } });
    } catch (error) {
      throw error;
    }
  }

  async getJobCategoryById(id: number): Promise<JobCategory> {
    try {
      const jobCategory = await this.jobCategoryRepository.findOneBy({
        id: id,
      });
      if (!jobCategory)
        throw new NotFoundException(
          `A JobCategory with id[${id}] could not be found!`,
        );
      return jobCategory;
    } catch (error) {
      throw error;
    }
  }

  async updateJobCategory(
    id: number,
    updateJobCategoryDto: UpdateJobCategoryDto,
  ): Promise<JobCategory> {
    try {
      const jobCategory = await this.getJobCategoryById(id);
      if (!jobCategory)
        throw new NotFoundException(
          `JobCategory with id[${id}] could not be found!`,
        );
      jobCategory.name = updateJobCategoryDto.name;
      return this.jobCategoryRepository.save(jobCategory);
    } catch (error) {
      throw error;
    }
  }

  async deleteJobCategory(id: number): Promise<JobCategory> {
    try {
      const jobCategory = await this.getJobCategoryById(id);
      if (!jobCategory)
        throw new NotFoundException(
          `JobCategory with id[${id}] could not be found!`,
        );
      return this.jobCategoryRepository.remove(jobCategory);
    } catch (error) {
      throw error;
    }
  }
}
