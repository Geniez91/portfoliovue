import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class StackImgDto {
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

export class Project {
  @Expose()
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @Type(() => Date)
  year: Date;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;

  @Expose()
  @ApiProperty()
  @IsString()
  linkGithub: string;

  @Expose()
  @ApiProperty()
  stackImg: StackImgDto[];

  @Expose()
  @ApiProperty()
  @IsArray()
  thumbnail: string[];

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  nbCollaborator: number;
}
