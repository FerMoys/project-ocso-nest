import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity.js";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @ApiProperty({
            default: "Centro Sur"
        })
    @Column({
        type:"text",
        unique: true
    })
    regionName: string;

    @ApiProperty({
            default:["Querétaro", "Guanajuato"]
        })
    @Column('simple-array')
    regionsStates: string[]


    @OneToMany(()=> Location, (location) => location.region)
    location: Location[];
}

