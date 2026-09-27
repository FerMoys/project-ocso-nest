import { IsString, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;
}