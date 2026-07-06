import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";

@Injectable()

export class ProjectRepository {
    constructor(private readonly prisma:PrismaService) {}

    async findAll(){
        return this.prisma.project.findMany();
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
    async createProject(projet:CreateProjectDto, workExperienceImgs:string[]){
        return await this.prisma.project.create({
        data: {
          content: projet.content,
          linkGithub: projet.linkGithub,
          description: projet.description,
          name: projet.name,
          nbCollaborator: projet.nbCollaborator,
          stackImg: projet.stackImg as [],
          year: projet.year,
          thumbnail: workExperienceImgs,
        },
      });
}
   async deleteProject(idProject:number){
    return await this.prisma.project.delete({
        where: {
          id: idProject,
        },
      });
}

  async updateProject(idProject:number, project:UpdateProjectDto, workExperienceImgs:string[]){
    return await this.prisma.project.update({
        where: {
          id: idProject,
        },
        data: {
          content: project.content,
          description: project.description,
          linkGithub: project.linkGithub,
          name: project.name,
          nbCollaborator: project.nbCollaborator,
          stackImg: project.stackImg as [],
          thumbnail: workExperienceImgs,
          year: project.year,
        },
      });
}
}