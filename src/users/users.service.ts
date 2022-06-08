import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  getAll(): Promise<Users[]> {
    return this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getOneById(id: any): Promise<Users> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(email: string): Promise<Users> {
    const newUser = this.userRepository.create({ email });
    return this.userRepository.save(newUser);
  }

  async updateUser(email: string, id: number): Promise<Users> {
    const user = await this.getOneById(id);
    user.username = email;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<Users> {
    const user = await this.getOneById(id);
    console.log(user);
    return;
    return this.userRepository.remove(user);
  }
}
