import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import {  Skills, SkillsParam } from './skills.interface';
import { AuthGuard } from '../auth/auth.guard'

@Controller('skills')
export class SkillsController {

    constructor(private skillService:SkillsService){}
    @Get()
    async findAllSkills():Promise<Skills[]>{
        return this.skillService.getAllSkills();
    }

    @UseGuards(AuthGuard)
    @Post()
     addSkills(@Body()body:Skills):void{
         this.skillService.addSkills(body)
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
