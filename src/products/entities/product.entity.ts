import { ApiProperty } from "@nestjs/swagger";
import { Provider } from "../../providers/entities/provider.entity.js";
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
        productId: string;

        @ApiProperty({
            default: "Coca-cola"
        })
        @Column({type:"text"})
        productName: string;

        @ApiProperty({
            default: 17.5
        })
        @Column({type:"float"})
        price: number;

        @ApiProperty({
            default: 10
        })
    @Column({type:"int"})
        countSeal: number;
    @ManyToOne(()=> Provider, (provider)=> provider.products, {
        eager:true,
    })
    @JoinColumn({
            name: 'providerId'
        })
    provider: Provider
}
