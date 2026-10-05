import 'multer';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service.js';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { ROLES } from '../auth/constants/roles.constants.js';
import { ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity.js';
import {ApiAuth} from '../auth/decorators/api.decorator.js'

@ApiAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
    schema: {
      example: {
        employeeId: "UUID",
        employeeName: "Fer",
        employeeEmail: "arroba@gmail.com",
        employeeLastName: "Miranda",
        employeePhoneNumber: "4461198765",
        employeePhoto: "kpojveiofv"
      } 
    }
  })
  @ApiResponse({
    status: 401,
    description: "missing or invalid token"
  })
  @ApiResponse({
    status: 401,
    description: "missing rol"
  })
  @ApiResponse({
    status: 500,
    description: "server error"
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }


  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
   

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: "./src/employees/employees-photos"
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    return "OK"
  }
  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }
  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'}))
    id: string
  ) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('/location/:id')
  findAllLocation(@Param('id')id:string){
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }
  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.employeesService.remove(id);
  }
}
