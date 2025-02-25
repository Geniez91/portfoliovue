import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {  AddSkills, Skills } from './skills.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SkillsService {
    constructor(private prisma:PrismaService){}

    async getAllSkills():Promise<Skills[]>{
        const result=await this.prisma.skills.findMany()

        const skills=plainToInstance(Skills,result, { excludeExtraneousValues: true })
        return skills;
    }

    async addSkills(skills:AddSkills):Promise<void>{
        await this.prisma.skills.create({
            data:{
                idType:skills.idType,
                language:skills.language,
                usageExperience:skills.usageExperience,
                yearsExperience:skills.yearsExperience,
                srcImg:skills.srcImage,
            }
        })
    }

    async updateSkills(idSkills:number,skills:AddSkills):Promise<void>{
        await this.prisma.skills.update({
            data: {
                language: skills.language,
                srcImg: skills.srcImage,
                idType: skills.idType,
                usageExperience: skills.usageExperience,
                yearsExperience: skills.yearsExperience,
            },
            where: {
                id:idSkills
            }
        })
}
async deleteSkills(idSkills:number):Promise<void>{
    await this.prisma.skills.delete({
        where:{
            id:idSkills
        }
    })
}
}
