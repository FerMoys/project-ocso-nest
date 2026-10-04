import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './constants/jwt.constants.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_KEY, 
      signOptions: {
        expiresIn: EXPIRES_IN, 
      },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}