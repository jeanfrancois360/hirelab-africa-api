import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConstants } from 'src/constants';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiration },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
