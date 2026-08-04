import { PaginationDto } from "@/common/dto/pagination.dto";
import { IsOptional, IsString } from "class-validator";

export class SkillQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    sortBy?: 'language' | 'level';

    @IsOptional()
    @IsString()
    order?: 'asc' | 'desc';
}