import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        id: id,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(email: string): Promise<User> {
    const newUser = this.userRepository.create({ email });
    return this.userRepository.save(newUser);
  }

  async updateUser(email: string, id: number): Promise<User> {
    const user = await this.getOneById(id);
    user.username = email;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    console.log(user);
    return;
    return this.userRepository.remove(user);
  }
}
