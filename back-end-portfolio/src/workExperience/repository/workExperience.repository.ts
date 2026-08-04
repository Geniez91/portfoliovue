import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class WorkExperienceRepository {
    constructor(private readonly prisma:PrismaService) {}

    async findAll(skip:number, take:number, search?:string, sortBy?: 'nameCompany' | 'job' | 'startDate' | 'endDate', order?: 'asc' | 'desc',startDate?:string){
        return this.prisma.workExperience.findMany({
          where: {...(search && {
            OR: [
              {
                nameCompany: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                job: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }), ...(startDate && {
            startDate: {
              equals: new Date(startDate),
            },
          })},
    orderBy: sortBy
  ? {
      [sortBy]: order,
    }
  : undefined,
          skip,
          take,
      });
}
  async countAll(){
    return this.prisma.workExperience.count();
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