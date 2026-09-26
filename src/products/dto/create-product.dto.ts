import { IsString, IsNumber, IsInt, IsUUID, ValidateNested } from 'class-validator';
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

  @ValidateNested()
  @Type(() => ProviderIdDto)
  provider: ProviderIdDto; 
}