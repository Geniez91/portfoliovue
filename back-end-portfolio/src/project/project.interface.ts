import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

class StackImgDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  img: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}


export class Project{

    @IsOptional()
    @ApiProperty()
    @IsNumber()
    @Type(()=>Number)
    id?:number

    @ApiProperty()
    @IsString()
    name:string

    @ApiProperty()
    @Type(()=>Date)
    year:Date

    @ApiProperty()
    @IsString()
    description:string

    @ApiProperty()
    @IsString()
    linkGithub:string

    @ApiProperty()
    stackImg:StackImgDto[]

    @ApiProperty()
    @IsArray()
    thumbnail:string[]

    @ApiProperty()
    content:string

    @ApiProperty()
    @Type(()=>Number)
    nbCollaborator:number

}