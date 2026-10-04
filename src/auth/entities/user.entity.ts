import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Manager } from "../../managers/entities/manager.entity.js";
import type { Employee } from "../../employees/entities/employee.entity.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column('text', {unique:true})
    userEmail: string;

    @Column('text')
    userPassword: string;

    @Column('simple-array', {
        default: "Employee"
    })
    userRoles: string[];

    
    @OneToOne('Manager', {
        eager: true
    })
    manager: Manager;

    @OneToOne('Employee', {
        eager: true
    })
    employee: Employee;
}