import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsObject } from 'class-validator';


export class LocationEmployeeDto {
  @ApiProperty()
  locationId: number;

  @ApiPropertyOptional()
  locationName:string;

  @ApiPropertyOptional()
  locationLatLng:number;

  @ApiPropertyOptional()
  locationAddress:string;

}


export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  employeeName: string;

  @ApiProperty()
  @IsString()
  employeeLastName: string;

  @ApiProperty()
  @IsString()
  employeePhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEmail()
  employeeEmail:string

  @ApiProperty()
  @IsString()
  @IsOptional()
  employeePhotoUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  location : LocationEmployeeDto;
}

