import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

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

export class WorkExperience {

  @IsOptional()
  @ApiProperty()
  @Type(()=>Number)
  id?:number

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameCompany: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  job: string;

  @IsNotEmpty()
  @ApiProperty()
  tasks: string[];

  @Type(()=>Date)
  @ApiProperty()
  startDate: Date;

  @Type(()=>Date)
  @ApiProperty()
  endDate: Date;

  stack: StackImgDto[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  srcImg:string;
}
