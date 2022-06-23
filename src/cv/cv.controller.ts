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
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Controller('Cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  createCv(@Body() createCvDto: CreateCvDto): Promise<Cv> {
    return this.cvService.createCv(createCvDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCvs(): Promise<Cv[]> {
    return this.cvService.getCvs();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getCv(@Param('id') id: number): Promise<Cv> {
    return this.cvService.getCvById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  updateCv(
    @Param('id') id: number,
    @Body() updateCvDto: UpdateCvDto,
  ): Promise<Cv> {
    return this.cvService.updateCv(+id, updateCvDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteCv(@Param('id') id: number): Promise<Cv> {
    return this.cvService.deleteCv(id);
  }
}
