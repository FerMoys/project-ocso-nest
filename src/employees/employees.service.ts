import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [{
    id: 1,
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "1199020384",
  },
  {
    id: 2,
    name: "Fernanda",
    lastName: "Costas",
    phoneNumber: "1199020382",
  }

  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length;
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    //retorne empleados
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.find((employee) => employee.id === id);
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    if (!employeeToUpdate) {
      return null; 
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
    })
    return updatedEmployee;
  }

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id != id);
    return this.employees;
  }
}
