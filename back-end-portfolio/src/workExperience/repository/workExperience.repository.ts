import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateWorkExperienceDto } from "../dto/update-workExperience.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class WorkExperienceRepository {
    constructor(private readonly prisma:PrismaService) {}

    async findAll(){
        return this.prisma.workExperience.findMany({
        orderBy: {
          startDate: 'desc',
        },
      });
}
    async findById(idWorkExperience:number){
        return await this.prisma.workExperience.findUnique({
        where: {
          id: idWorkExperience,
        },
      });}

    async findByNameCompany(nameCompany:string){
        return await this.prisma.workExperience.findFirst({
        where: {
          nameCompany: nameCompany,
        },
      });
}
    async createWorkExperience(data:Prisma.workExperienceCreateInput){
       return await this.prisma.workExperience.create({
        data: data
})}

    async deleteWorkExperience(idWorkExperience:number){
        return await this.prisma.workExperience.delete({
        where: {
          id: idWorkExperience,
        },
      });
}
    async updateWorkExperience(idWorkExperience:number, workExperience: Prisma.workExperienceUpdateInput){
       return await this.prisma.workExperience.update({
        data: workExperience,
        where: {
          id: idWorkExperience,
        },
      });
}
}