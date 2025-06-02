import {  Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from './project.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AuthGuard } from '@/auth/auth.guard';

@ApiTags('project')
@Controller('project')
export class ProjectController {
    constructor(private projetService:ProjectService){}

    @Get()
    async findAllProject():Promise<Project[]>{
    return this.projetService.getAllProject();
    }

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard)
    async addProject(@UploadedFiles() files: Express.Multer.File[],@Body() body: any): Promise<Project> {
             console.log(body.stackImg)
        const workExperienceImgs = await this.projetService.uploadImages(files);
                const transformed = plainToInstance(Project, {
                ...body,
                year: new Date(body.year),
                stackImg: JSON.parse(body.stackImg),
              });
              await validateOrReject(transformed);
              return await this.projetService.addProject(workExperienceImgs,transformed);
    }
    
    

}
