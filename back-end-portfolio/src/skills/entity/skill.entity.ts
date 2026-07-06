import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class Skills {
  @ApiProperty()
  @Expose()
  @Type(() => Number)
  id: number;
  @ApiProperty({
    example: 'HTML',
  })
  @Expose()
  language: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @Type(() => Number)
  yearsExperience?: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  @Type(() => Date)
  usageExperience?: Date;

  @ApiProperty()
  @Expose()
  srcImg: string;

  @ApiProperty()
  @Expose()
  idType: string;
  
  @ApiProperty()
  @Expose()
  @IsOptional()
  level?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @Type(() => Number)
  TOIEC?: number;
}