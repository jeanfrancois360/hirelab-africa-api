import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/User.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteRole(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
