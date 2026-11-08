import { IsString, IsNumber, IsInt, IsUUID, ValidateNested, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ProviderIdDto {
  @IsUUID("4")
  providerId: string;
}

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsNumber()
  price: number;

  @IsInt()
  countSeal: number;

  @IsString()
  @IsOptional()
  provider: string
}