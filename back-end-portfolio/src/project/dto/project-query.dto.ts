import { PaginationDto } from "@/common/dto/pagination.dto";
import { IsIn, IsOptional, IsString } from "class-validator";

export class ProjectQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsIn(['name','year'])
    sortBy?: 'name' | 'year';

    @IsOptional()
    @IsIn(['asc','desc'])
    order?: 'asc' | 'desc';
}