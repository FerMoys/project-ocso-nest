import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service.js';
import { EmployeesController } from './employees.controller.js';
import { Employee } from './entities/employee.entity.js';
import { AwsModule } from '../aws/aws.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), AwsModule
],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [TypeOrmModule],
})
export class EmployeesModule {}