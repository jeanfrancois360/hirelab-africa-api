import { Controller, Get } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/register')
  register(): Promise<Users> {
    return this.usersService.createUser('john@gmail.com');
  }

  @Get()
  getUsers(): Promise<Users[]> {
    return this.usersService.getAll();
  }
}
