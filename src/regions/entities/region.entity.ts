import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity.js";
@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @Column({
        type:"text",
        unique: true
    })
    regionName: string;
    @Column('simple-array')
    regionsStates: string[]


    @OneToMany(()=> Location, (location) => location.region)
    location: Location[];
}

