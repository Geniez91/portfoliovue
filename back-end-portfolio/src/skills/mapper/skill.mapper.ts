import { plainToInstance } from "class-transformer";
import { Skills } from "../entity/skill.entity";
import { CreateSkillDto } from "../dto/create-skill.dto";
import { Prisma } from "@prisma/client";
import { UpdateSkillDto } from "../dto/update-skill.dto";

export class SkillMapper {
    static toEntity(data: any): Skills {
        return plainToInstance(Skills, data, {
            excludeExtraneousValues: true,
        });
    }

    static toEntities(data: any[]): Skills[] {
        return plainToInstance(Skills, data, {
            excludeExtraneousValues: true,
        });
    }

    static toCreateInput(dto:CreateSkillDto,srcImg:string):Prisma.skillsCreateInput{
        return {
            ...dto,
            srcImg
        }
    }

    static toUpdateInput(dto:UpdateSkillDto,srcImg?:string):Prisma.skillsUpdateInput{
       return{
        ...dto,
        ...(srcImg && {srcImg})
       }
}
}