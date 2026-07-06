import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateWorkExperienceDto } from "../dto/update-workExperience.dto";

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
    async createWorkExperience(workExperience:any, workExperienceImg:string){
       return await this.prisma.workExperience.create({
        data: {
          content: workExperience.content,
          endDate: workExperience.endDate,
          nameCompany: workExperience.nameCompany,
          job: workExperience.job,
          stack: workExperience.stack as [],
          tasks: workExperience.tasks,
          startDate: workExperience.startDate,
          srcImg: workExperienceImg,
        },
})}

    async deleteWorkExperience(idWorkExperience:number){
        return await this.prisma.workExperience.delete({
        where: {
          id: idWorkExperience,
        },
      });
}
    async updateWorkExperience(idWorkExperience:number, workExperience: UpdateWorkExperienceDto,workExperienceImg?: string){
       return await this.prisma.workExperience.update({
        data: {
          endDate: workExperience.endDate,
          job: workExperience.job,
          nameCompany: workExperience.nameCompany,
          srcImg: workExperienceImg,
          startDate: workExperience.startDate,
          tasks: workExperience.tasks,
          content: workExperience.content,
          stack: workExperience.stack as [],
        },
        where: {
          id: idWorkExperience,
        },
      });

}
}