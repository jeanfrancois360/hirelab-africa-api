import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signInLocal(@Body() payload: SignInDto) {
    return this.authService.signInLocal(payload);
  }

  @Post('/signup')
  signUpLocal(@Body() payload: CreateUserDto) {
    return this.authService.signUpLocal(payload);
  }
}
