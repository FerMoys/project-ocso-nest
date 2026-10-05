import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity.js"; // Importación normal
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @ApiProperty({
        default: "FEMSA"
    })
    @Column('text')
    providerName: string;

    @ApiProperty({
        default: "provider@gmail.com"
    })
    @Column('text', {unique:true})
    providerEmail: string;

    @ApiProperty({
        default: "22463894906"
    })
    @Column({
        type: "text",
        nullable: true,
    })
    providerPhoneNumber: string;

   
    @OneToMany(() => Product, (product) => product.provider)
    products: Product[];
}