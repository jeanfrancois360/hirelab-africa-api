import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('file-upload')
// export class FileUploadController {
//   @Post()
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//           const customFileName = uuid(),
//             fileExtension = file.originalname.split('.')[1]; // get file extension from original file name
//           cb(null, customFileName + '.' + fileExtension);
//         },
//       }),
//     }),
//   )
//   uploadFile(@UploadedFile() file: Express.Multer.File) {
//     return {
//       file: file.filename,
//       status: '201',
//       message: 'File uploaded successfully',
//     };
//   }

//   @Get(':imgPath')
//   seeUploadedFile(@Param('imgPath') image: string, @Res() res: any) {
//     return res.sendFile(image, { root: 'uploads' });
//   }
// }

@Controller('file-upload')
export class FileUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file.filename,
      status: '201',
      message: 'File uploaded successfully',
    };
  }

  @Get(':imgPath')
  seeUploadedFile(@Param('imgPath') image: string, @Res() res: any) {
    return res.sendFile(image, { root: 'uploads' });
  }
}
