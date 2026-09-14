import { IsUUID, IsOptional, IsString, MaxLength, IsNumber, IsInt, Min, isNumber } from 'class-validator';
export class CreateProductDto {
    @IsUUID("4")
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
     @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID()
    provider: string;
}
