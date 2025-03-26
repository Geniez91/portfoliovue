import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { SkillsService } from './skills.service';
import {  AddSkills, Skills, SkillsParam } from './skills.interface';
import { AuthGuard } from '../auth/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {

    constructor(private skillService:SkillsService){}
    @Get()
    async findAllSkills():Promise<Skills[]>{
        return this.skillService.getAllSkills();
    }

    @ApiBody({type:AddSkills})
    @ApiConsumes('multipart/form-data')
    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
     async addSkills( @UploadedFile() file:Express.Multer.File,@Body()body:AddSkills):Promise<Skills>{
        const skillsImg=await this.skillService.uploadImage(file)
        return this.skillService.addSkills(skillsImg,body)
    }

    @ApiBody({type:AddSkills})
    @UseGuards(AuthGuard)
    @Put()
    updateSkills(@Query('id') id:number, @Body() body:AddSkills):Promise<Skills>{
        return this.skillService.updateSkills(id,body)
    }

    @UseGuards(AuthGuard)
    @Delete()
    deleteSkills(@Query('id')id:number):Promise<Skills>{
        return this.skillService.deleteSkills(id);
    }
}
