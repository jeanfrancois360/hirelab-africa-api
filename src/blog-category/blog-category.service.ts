import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { slugifyConstants } from 'src/constants';
import { uuidGen } from 'src/utils/uuid-gen';
import { Repository } from 'typeorm';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { BlogCategory } from './entities/blog-category.entity';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly blogCategoryRepository: Repository<BlogCategory>,
  ) {}
  async createBlogCategory(
    createBlogCategoryDto: CreateBlogCategoryDto,
  ): Promise<BlogCategory> {
    try {
      const newBlogCategory = this.blogCategoryRepository.create(
        createBlogCategoryDto,
      );
      newBlogCategory.slug = slugify(newBlogCategory.name, slugifyConstants);
      newBlogCategory.uuid = uuidGen();
      return await this.blogCategoryRepository.save(newBlogCategory);
    } catch (error) {
      throw error;
    }
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    try {
      return await this.blogCategoryRepository.find({ order: { id: 'DESC' } });
    } catch (error) {
      throw error;
    }
  }

  async getBlogCategoryById(id: number): Promise<BlogCategory> {
    try {
      const blogCategory = await this.blogCategoryRepository.findOneBy({
        id: id,
      });
      if (!blogCategory)
        throw new NotFoundException(
          `A BlogCategory with id[${id}] could not be found!`,
        );
      return blogCategory;
    } catch (error) {
      throw error;
    }
  }

  async updateBlogCategory(
    id: number,
    updateBlogCategoryDto: UpdateBlogCategoryDto,
  ): Promise<BlogCategory> {
    try {
      const blogCategory = await this.getBlogCategoryById(id);
      if (!blogCategory)
        throw new NotFoundException(
          `BlogCategory with id[${id}] could not be found!`,
        );
      blogCategory.name = updateBlogCategoryDto.name;
      return this.blogCategoryRepository.save(blogCategory);
    } catch (error) {
      throw error;
    }
  }

  async deleteBlogCategory(id: number): Promise<BlogCategory> {
    try {
      const blogCategory = await this.getBlogCategoryById(id);
      if (!blogCategory)
        throw new NotFoundException(
          `BlogCategory with id[${id}] could not be found!`,
        );
      return this.blogCategoryRepository.remove(blogCategory);
    } catch (error) {
      throw error;
    }
  }
}
