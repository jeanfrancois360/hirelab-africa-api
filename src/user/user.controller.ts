import { Controller, Get, Param } from '@nestjs/common';
import { User } from './entities/User.entity';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }
}
