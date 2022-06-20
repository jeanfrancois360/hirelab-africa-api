import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      status: '201',
      message: 'File uploaded successfully',
    };
  }
}
