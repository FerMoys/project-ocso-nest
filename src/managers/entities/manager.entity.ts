import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import type { Location } from "../../locations/entities/location.entity.js";
import type { User } from "../../auth/entities/user.entity.js"; 

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;

    @Column('text')
    managerFullName: string;

    @Column('float')
    managerSalary: number;

    @Column('text', {unique:true})
    managerEmail: string;

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