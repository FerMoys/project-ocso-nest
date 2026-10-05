import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common'; // <-- 1. Añadido 'Put' aquí
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ApiAuth } from './decorators/api.decorator.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto);
  }

  @Post("login")
  login(@Body() createUserDto: CreateUserDto){
    return this.authService.loginUser(createUserDto);
  }

  @Patch(":email")
  updateUser(
    @Param('email') userEmail: string, 
    @Body() updateUserDto: UpdateUserDto 
  ){
    return this.authService.updateUserData(userEmail, updateUserDto);
  }
}