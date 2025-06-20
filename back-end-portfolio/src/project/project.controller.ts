import {  Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from './project.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AuthGuard } from '@/auth/auth.guard';
import { WorkExperience } from '@/workExperience/workExperience.interface';

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
                const workExperienceImgs = await this.projetService.uploadImages(files);
                const transformed = plainToInstance(Project, {
                ...body,
                year: new Date(body.year),
                stackImg: JSON.parse(body.stackImg),
                thumbnail:workExperienceImgs
                
              });
              await validateOrReject(transformed);
              return await this.projetService.addProject(transformed);
    }

    @Delete()
    @UseGuards(AuthGuard)
    async deleteProject(@Query('id')id:number):Promise<Project>{
    return await this.projetService.deleteProject(id)
    }

    @ApiBody({type:WorkExperience})
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard)
    @Put()
    @UseInterceptors(FilesInterceptor('file'))
    async updateProject( @Query('id') id:number, @Body() body:any,@UploadedFiles() files: Express.Multer.File[]):Promise<Project>{
                const workExperienceImgs = await this.projetService.uploadImages(files);
                const transformed = plainToInstance(Project, {
                ...body,
                year: new Date(body.year),
                stackImg: JSON.parse(body.stackImg),
                thumbnail:workExperienceImgs
              });
              await validateOrReject(transformed);
              return await this.projetService.updateProject(id,transformed);
    }
    
    
    

}
