import { TransformJsonArray } from "@/decorators/transform-json-array.decorator.ts";
import { StackImgDto } from "@/project/entity/project.entity.dto";
import { ApiProperty } from "@nestjs/swagger";
import { plainToInstance, Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateWorkExperienceDto {
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
  @IsArray()
  @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
  tasks: string[];

  @Type(() => Date)
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @Type(() => StackImgDto)
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @TransformJsonArray(StackImgDto)
  stack: StackImgDto[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
