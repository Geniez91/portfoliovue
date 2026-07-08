import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class StackImgDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  img: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class WorkExperience {
  @Expose()
  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  id?: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameCompany: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  job: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  tasks: string[];

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  startDate: Date;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  endDate: Date;

  @Expose()
  @ApiProperty()
  @Type(() => StackImgDto)
  @IsArray()
  @ValidateNested({ each: true })
  stack: StackImgDto[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  srcImg: string;
}
