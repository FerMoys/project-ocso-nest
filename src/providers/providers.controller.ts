import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service.js';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { UserData } from '../auth/decorators/user.decorator.js';
import { User } from '../auth/entities/user.entity.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Auth } from '../auth/decorators/auth.decorator.js';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
  @Auth("Admin")
  @Get()
  findAll(@UserData() user:User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estás autorizado, sólo managers")
    return this.providersService.findAll();
  }
  @Get('/name/:name')
  findOneByName(@Param('name') name: string) { 
    return this.providersService.findOneByName(name); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) { 
    return this.providersService.findOne(id); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id); 
  }
}
