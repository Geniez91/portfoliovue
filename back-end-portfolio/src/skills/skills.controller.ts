import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { SkillsService } from './skills.service';
import {  AddSkills, Skills, SkillsParam } from './skills.interface';
import { AuthGuard } from '../auth/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('skills')
export class SkillsController {

    constructor(private skillService:SkillsService){}
    @Get()
    async findAllSkills():Promise<Skills[]>{
        return this.skillService.getAllSkills();
    }



    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
     async addSkills( @UploadedFile() file:Express.Multer.File,@Body()body:AddSkills):Promise<void>{
        const skillsImg=await this.skillService.uploadImage(file)
         this.skillService.addSkills(skillsImg,body)
    }

    @UseGuards(AuthGuard)
    @Put()
    updateSkills(@Query('id') id:number, @Body() body:Skills):void{
        this.skillService.updateSkills(id,body)
    }

    @UseGuards(AuthGuard)
    @Delete()
    deleteSkills(@Query('id')id:number):void{
        this.skillService.deleteSkills(id)
    }
}
