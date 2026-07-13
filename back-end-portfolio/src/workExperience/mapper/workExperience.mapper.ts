import { plainToInstance } from "class-transformer";
import { WorkExperience } from "../entity/workExperience.entity";
import { Prisma } from "@prisma/client";
import { CreateWorkExperienceDto } from "../dto/create-workExperience.dto";
import { UpdateWorkExperienceDto } from "../dto/update-workExperience.dto";
import { StackImgDto } from "@/project/entity/project.entity.dto";

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

    static toCreateInput(dto:CreateWorkExperienceDto,workExperienceImg:string):Prisma.workExperienceCreateInput{
        return {
           nameCompany: dto.nameCompany,
            job: dto.job,
            tasks: dto.tasks,
            startDate: dto.startDate,
            endDate: dto.endDate,
            stack: this.toStackJson(dto.stack),
            content: dto.content,
            srcImg: workExperienceImg,
        }
    }

    static toUpdateInput(dto:UpdateWorkExperienceDto,workExperienceImg?:string):Prisma.workExperienceUpdateInput{
         return {
            nameCompany: dto.nameCompany,
            job: dto.job,
            tasks: dto.tasks,
            startDate: dto.startDate,
            endDate: dto.endDate,
            stack: (dto.stack && this.toStackJson(dto.stack)),
            content: dto.content,
            ...(workExperienceImg && {srcImg: workExperienceImg})
         }
    }

    private static toStackJson(
  stack: StackImgDto[],
): Prisma.InputJsonValue {
  return stack.map(item => ({
    img: item.img,
    name: item.name,
  })) as Prisma.InputJsonValue;
}
}