import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class SkillRepository {
    constructor(private prisma:PrismaService) {}

    async findAll(){
        return this.prisma.skills.findMany();
    }

    async findByLanguage(language:string){
        return this.prisma.skills.findFirst({
            where:{
                language: language
            }
        });
    }

    async createSkill(data: Prisma.skillsCreateInput){
        return await this.prisma.skills.create({
        data
      });
    }

    async findById(idSkills:number){
    return await this.prisma.skills.findUnique({
      where: {
        id: idSkills,
      },
    });
}

   async updateSkill(idSkills:number, data:Prisma.skillsUpdateInput){
    return await this.prisma.skills.update({
        data: data,
        where: {
          id: idSkills,
        },
      });
    }

    async deleteSkill(idSkills:number){
        return await this.prisma.skills.delete({
        where: {
          id: idSkills,
        },
      });
}}