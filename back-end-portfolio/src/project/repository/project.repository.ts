import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { Prisma } from "@prisma/client";

@Injectable()

export class ProjectRepository {
    constructor(private readonly prisma:PrismaService) {}

    async findAll(skip?:number, take?:number, search?:string,   sortBy?: 'name' | 'year', order?: 'asc' | 'desc'){
        return this.prisma.project.findMany({
          skip,
          take,
where: {
  ...(search && {
    name: {
      contains: search,
      mode: 'insensitive',
    },
    })},
    orderBy: sortBy
  ? {
      [sortBy]: order,
    }
  : undefined,
})
  }

    async countAll(){
        return this.prisma.project.count();
    }

    async findById(idProject:number){
     return await this.prisma.project.findUnique({
      where: {
        id: idProject,
      },
    })}

    async findByName(name:string){
        return await this.prisma.project.findFirst({
        where: {
          name: name,
        },
      });
}
    async createProject(data:Prisma.projectCreateInput){
        return await this.prisma.project.create({
        data
      });
}
   async deleteProject(idProject:number){
    return await this.prisma.project.delete({
        where: {
          id: idProject,
        },
      });
}

  async updateProject(idProject:number, data:Prisma.projectUpdateInput){
    return await this.prisma.project.update({
        where: {
          id: idProject,
        },
        data
      });
}
}