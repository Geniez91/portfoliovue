import {  Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from './project.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@ApiTags('project')
@Controller('project')
export class ProjectController {
    constructor(private projetService:ProjectService){}

    @Get()
    async findAllProject():Promise<Project[]>{
    return this.projetService.getAllProject();
    }

    // @Post()
    // @UseInterceptors(FileInterceptor('file'))
    // @ApiConsumes('multipart/form-data')
    // @UseGuards(AuthGuard)
    // async addProject(@UploadedFiles() files: Express.Multer.File[],@Body() body: any): Promise<Project> {
    //           const workExperienceImgs = await this.projetService.uploadImages(files);
    //             const transformed = plainToInstance(Project, {
    //             ...body,
    //             year: new Date(body.year),
    //             stack: JSON.parse(body.stack),
    //           });
    //           await validateOrReject(transformed);
    //           return await this.projetService.addProject(workExperienceImgs,transformed);
    // }
    
    

}
