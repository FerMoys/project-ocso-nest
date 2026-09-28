import { IsArray, IsString, MaxLength} from "class-validator";
import { Region } from "../entities/region.entity.js";

export class CreateRegionDto  {
    @IsString()
    @MaxLength(100)
    regionName:string;
    @IsArray()
    regionStates: string[]
}
