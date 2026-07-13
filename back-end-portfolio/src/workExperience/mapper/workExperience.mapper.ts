import { plainToInstance } from "class-transformer";
import { WorkExperience } from "../entity/workExperience.entity";

export class WorkExperienceMapper {
    static toEntity(data: any): WorkExperience {
        return plainToInstance(WorkExperience, data, {
            excludeExtraneousValues: true,
        });
    }

    static toEntities(data: any[]): WorkExperience[] {
        return plainToInstance(WorkExperience, data, {
            excludeExtraneousValues: true,
        });
    }

    static toCreateInput(dto:any,workExperienceImg:string):any{
        return {
            ...dto,
            srcImg:workExperienceImg
        }
    }

    static toUpdateInput(dto:any,workExperienceImg?:string):any{
         return {
            ...dto,
            ...(workExperienceImg && {srcImg: workExperienceImg})
         }
    }
}