import {  Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from './project.interface';

@ApiTags('project')
@Controller('project')
export class ProjectController {
    constructor(private projetService:ProjectService){}

    @Get()
    async findAllProject():Promise<Project[]>{
    return this.projetService.getAllProject();
    }

    

}
