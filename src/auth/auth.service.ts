import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt'; 
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ){}

  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(loginUser: LoginUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUser.userEmail
      }
    });
    
    if (!user) throw new UnauthorizedException("Credenciales inválidas"); 

    const match = await bcrypt.compare(loginUser.userPassword, user.userPassword);
    if(!match) throw new UnauthorizedException("No estás autorizado");

    // CORREGIDO: Payload limpio sin contraseña, usando userId (o el identificador de tu entidad)
    const payload = { 
      id: user.userId,
      userEmail: user.userEmail,
      userRoles: user.userRoles
    };

    const token = this.jwtService.sign(payload);
    
    return {
      user: payload,
      token
    };
  }

  async updateUserData(userEmail: string, updateUserDto: UpdateUserDto){
    const user = await this.userRepository.findOne({ where: { userEmail } });
    if (!user) throw new NotFoundException("Usuario no encontrado");

    const newUserData = await this.userRepository.preload({
      userId: user.userId,
      ...updateUserDto
    });

    // Validamos si es undefined para satisfacer a TypeScript
    if (!newUserData) {
      throw new NotFoundException("No se pudieron cargar los datos para actualizar");
    }

    if (updateUserDto.userPassword) {
      newUserData.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5);
    }

    await this.userRepository.save(newUserData);
    return newUserData;
  }
}