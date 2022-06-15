import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDto } from './create-blog-post.dto';

export class UploadBlogPostDto extends PartialType(CreateBlogPostDto) {}
