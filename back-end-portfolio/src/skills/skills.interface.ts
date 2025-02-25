import { Expose, Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class Skills{
@Expose()
@Type(()=>Number)
id:number;
@Expose()
language:string;
@Expose()
@Type(()=>Number)
yearsExperience:number;
@Expose()
@Type(()=>Number)
usageExperience:number;
@Expose()
srcImage:string;
@Expose()
idType:string
}

export class AddSkills{
    @Expose()
language:string;
@Expose()
@Type(()=>Number)
yearsExperience:number;
@Expose()
@Type(()=>Number)
usageExperience:number;
@Expose()
srcImage:string;
@Expose()
idType:string
}

export class SkillsParam{
    @IsNumber()
    id:number;
}