import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class Skills{
@ApiProperty()
@Expose()
@Type(()=>Number)
id:number;
@ApiProperty({
    example:'HTML'
})
@Expose()
language:string;
@ApiProperty()
@Expose()
@Type(()=>Number)
yearsExperience:number;
@ApiProperty()
@Expose()
@Type(()=>Date)
usageExperience:Date;
@ApiProperty()
@Expose()
srcImage:string;
@ApiProperty()
@Expose()
idType:string
}

export class AddSkills{
@ApiProperty()
@Expose()
language:string;
@ApiProperty()
@Expose()
@Type(()=>Number)
yearsExperience:number;
@ApiProperty()
@Expose()
@Type(()=>Date)
usageExperience:Date;
@ApiProperty()
@Expose()
idType:string
}

export class SkillsParam{
    @IsNumber()
    id:number;
}