import { plainToInstance } from "class-transformer";
import { Project } from "../entity/project.entity.dto";
import { Prisma } from "@prisma/client";

export class ProjectMapper {
 static toEntity(data: any): Project {
         return plainToInstance(Project, data, {
             excludeExtraneousValues: true,
         });
     }

static toEntities(data: any[]): Project[] {
    return plainToInstance(Project, data, {
        excludeExtraneousValues: true,
    });
}

static toCreateInput(dto:any,workExperienceImgs:string[]):Prisma.projectCreateInput{
    return {
        ...dto,
        thumbnail: workExperienceImgs
    }
}

static toUpdateInput(dto:any,workExperienceImgs?:string[]):Prisma.projectUpdateInput{
    return {
        ...dto,
        ...(workExperienceImgs && {thumbnail: workExperienceImgs})
    }
}
}

