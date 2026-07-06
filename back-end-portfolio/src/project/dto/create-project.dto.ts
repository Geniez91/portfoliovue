import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray,  IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StackImgDto } from "../entity/project.entity.dto";
import { TransformJsonArray } from "@/decorators/transform-json-array.decorator.ts";

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  year: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  linkGithub: string;

  @ApiProperty()
  @Type(() => StackImgDto)
  @IsArray()
  @TransformJsonArray(StackImgDto)
  stackImg: StackImgDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  nbCollaborator: number;
}
