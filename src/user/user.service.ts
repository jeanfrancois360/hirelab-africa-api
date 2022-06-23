import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { uuidGen } from 'src/utils/uuid-gen';
import { RoleService } from 'src/role/role.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      // check if user already exist
      const user = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      if (user)
        throw new ConflictException('A user with this email already exists!');

      // Check if role is available
      const role = await this.roleService.getRoleByName(createUserDto.role);

      if (!role) throw new NotFoundException(`Role not found!`);

      const newUser = this.userRepository.create({
        email: createUserDto.email,
        password: createUserDto.password,
      });
      newUser.role = role;
      newUser.uuid = uuidGen();
      if (await this.userRepository.save(newUser)) {
        if (await this.profileService.createProfile(createUserDto)) {
          return newUser;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);
    return this.userRepository.remove(user);
  }
}
