import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { uuidGen } from 'src/utils/uuid-gen';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private readonly cvRepository: Repository<Cv>,
    private readonly userService: UserService,
  ) {}

  async createCv(createCvDto: CreateCvDto): Promise<Cv> {
    try {
      // Check if Cv already exists
      const user = await this.userService.getUserById(createCvDto.candidate);
      if (!user)
        throw new ConflictException(
          `A user with id [${createCvDto.candidate}] could not be found!`,
        );
      const newCv = this.cvRepository.create(createCvDto);
      newCv.uuid = uuidGen();
      return await this.cvRepository.save(newCv);
    } catch (error) {
      throw error;
    }
  }

  async getCvs(): Promise<Cv[]> {
    try {
      return await this.cvRepository.find({ order: { id: 'DESC' } });
    } catch (error) {
      throw error;
    }
  }

  async getCvById(id: number): Promise<Cv> {
    try {
      const Cv = await this.cvRepository.findOneBy({ id: id });
      if (!Cv)
        throw new NotFoundException(`A Cv with id[${id}] could not be found!`);
      return Cv;
    } catch (error) {
      throw error;
    }
  }

  async updateCv(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    try {
      const cv = await this.getCvById(id);
      if (!cv)
        throw new NotFoundException(`A CV with id[${id}] could not be found!`);
      cv.file = updateCvDto.file;
      return this.cvRepository.save(cv);
    } catch (error) {
      throw error;
    }
  }

  async deleteCv(id: number): Promise<Cv> {
    try {
      const cv = await this.getCvById(id);
      if (!cv)
        throw new NotFoundException(`A CV with id[${id}] could not be found!`);
      return this.cvRepository.remove(cv);
    } catch (error) {
      throw error;
    }
  }
}
