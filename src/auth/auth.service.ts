import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtService,
  ) {}

  async signInLocal(credentials: SignInDto): Promise<any> {
    // retrieve user
    const user = await this.userService.getUserByEmail(credentials.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.password !== credentials.password)
      throw new UnauthorizedException('Invalid credentials');

    const token_payload = { sub: user.id, email: user.email, type: 'user' };
    return {
      access_token: this.jwtTokenService.sign(token_payload),
    };
  }

  async signUpLocal(payload: CreateUserDto): Promise<User> {
    return await this.userService.createUser(payload);
  }
}
