import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import type { Manager } from "../../managers/entities/manager.entity.js";
import { Region } from "../../regions/entities/region.entity.js";
import { Employee } from "../../employees/entities/employee.entity.js";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @Column('text')
    locationName: string;

    @Column('text')
    locationAddress: string;

    @Column('simple-array')
    locationLatLng: number[];

    // Pasa el nombre de la entidad directamente como string
    @OneToOne('Manager', (manager: Manager) => manager.location)
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager;

    @ManyToOne(()=> Region, (region) => region.location)
    @JoinColumn({
        name: 'regionId'
    })
    region: Region
    @OneToMany(()=> Employee, (employee) => employee.location)
    employees: Employee[];
}