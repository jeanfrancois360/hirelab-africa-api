import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(payload: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(payload);
      return this.userRepository.save(newUser);
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
    user.username = email;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);
    return this.userRepository.remove(user);
  }
}
