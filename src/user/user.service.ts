import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { uuidGen } from 'src/utils/uuid-gen';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      // check if user already exist
      const user = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      if (user)
        throw new ConflictException('A user with this email already exists!');

      // Check if role already exists
      const role = await this.roleRepository.findOneBy({
        id: createUserDto.role_id,
      });

      if (!role)
        throw new NotFoundException(
          `A role with id[${createUserDto.role_id}] could not be found!`,
        );

      const newUser = this.userRepository.create(createUserDto);
      newUser.role = role;
      newUser.uuid = uuidGen();
      if (this.userRepository.save(newUser)) {
        const newProfile = this.profileRepository.create({
          email: newUser.email,
        });
        newProfile.user = newUser;
        this.profileRepository.save(newProfile);
        return this.userRepository.save(newUser);
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

  async updateUser(email: string, id: number): Promise<User> {
    const user = await this.getUserById(id);
    user.email = email;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);
    return this.userRepository.remove(user);
  }
}
