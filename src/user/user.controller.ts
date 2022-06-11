import { Controller, Get, Param } from '@nestjs/common';
import { User } from './entities/User.entity';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('/register')
  register(): Promise<User> {
    return this.UserService.createUser('john@gmail.com');
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.UserService.getOneById(id);
  }
}
