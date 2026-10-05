import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import type { Manager } from "../../managers/entities/manager.entity.js";
import { Region } from "../../regions/entities/region.entity.js";
import { Employee } from "../../employees/entities/employee.entity.js";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "ocso juriquilla"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "AV. YTTASO #505"
    })
    @Column('text')
    locationAddress: string;


    @ApiProperty({
        default: [20, 40]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne('Manager', (manager: Manager) => manager.location)
    @JoinColumn({
        name: "managerId",
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