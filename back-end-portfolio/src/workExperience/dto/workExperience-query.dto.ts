import { PaginationDto } from "@/common/dto/pagination.dto";
import { IsOptional, IsString } from "class-validator";

export class WorkExperienceQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search?: string;
    
    @IsOptional()
    @IsString()
    sortBy?:  'nameCompany' | 'job' | 'startDate' | 'endDate';

    @IsOptional()
    @IsString()
    order?: 'asc' | 'desc';
}
