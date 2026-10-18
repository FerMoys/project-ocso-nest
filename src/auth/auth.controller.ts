import { Controller, Get, Post, Put, Body, Patch, Param, Delete, Res } from '@nestjs/common'; // <-- 1. Añadido 'Put' aquí
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ApiAuth } from './decorators/api.decorator.js';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto.js';
import type { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants.js';
import { Cookies } from './decorators/cookies.decorator.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto);
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response, @Cookies() cookies: any
  ){
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure:false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000*60*60*24*7
      
      
    })
    return { message: 'Inicio de sesión exitoso' };;
  }

  @Patch(":email")
  updateUser(
    @Param('email') userEmail: string, 
    @Body() updateUserDto: UpdateUserDto 
  ){
    return this.authService.updateUserData(userEmail, updateUserDto);
  }
}