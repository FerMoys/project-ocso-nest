import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
      id: uuid(),
      name: "Alberto",
      lastName: "Costas",
      phoneNumber: "1199020384",
    },
    {
      id: uuid(),
      name: "Fernanda",
      lastName: "Costas",
      phoneNumber: "1199020382",
    }
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.find((employee) => employee.id === id);
    if(!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    if (!employeeToUpdate) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    const updatedEmployee = {
        ...employeeToUpdate,
        ...updateEmployeeDto
    };
    this.employees = this.employees.map((employee) => {
      if(employee.id === id){
        return updatedEmployee;
      }
      return employee;
    });
    
    return updatedEmployee;
  }

  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}