import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,  } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){
    
  }
  registerUser(createUserDto:CreateUserDto){
    return this.userRepository.save(createUserDto)
  }
}
