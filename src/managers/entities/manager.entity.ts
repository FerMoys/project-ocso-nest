import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import type { Location } from "../../locations/entities/location.entity.js";
import type { User } from "../../auth/entities/user.entity.js"; 
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @ApiProperty({
        default: "Lola Baddie"
    })
    @Column('text')
    managerFullName: string;

    @ApiProperty({
        default: 30000
    })
    @Column('float')
    managerSalary: number;

    @ApiProperty({
        default: "manager@gmail.com"
    })
    @Column('text', {unique:true})
    managerEmail: string;

    @ApiProperty({
        default: "2230485876"
    })
    @Column('text')
    managerPhoneNumber: string;

    @OneToOne('Location', (location: Location) => location.manager)
    location: Location;

    @OneToOne('User', (user: User) => user.manager, { onDelete: 'CASCADE' }) // Opcional: onDelete según tus reglas de negocio
    @JoinColumn({
        name: "userId"
    })
    user: User;
}