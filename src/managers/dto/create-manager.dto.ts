import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity.js";

export class CreateManagerDto {
    @IsString()
    @MaxLength(100)
    managerFullName:string;
    @IsString()
    @IsEmail()
    managerEmail:string;
    @IsNumber()
    managerSalary:number
    @IsString()
    @MaxLength(16)
    managerPhoneNumber:string
}
