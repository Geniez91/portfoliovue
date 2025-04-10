import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkExperienceService } from "./workExperience.service";
import { WorkExperience } from "./workExperience.interface";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "@/auth/auth.guard";

@Controller('workExperience')
export class WorkExperienceController {
        constructor(private workExperienceService:WorkExperienceService){}
        @Get()
        async findAllWorkExperience():Promise<WorkExperience[]>{
            return this.workExperienceService.getAllWorkExperience();
        }

        @ApiBody({type:WorkExperience})
        @Post()
        @UseGuards(AuthGuard)
        @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
        async addSkills(@Body() body:WorkExperience):Promise<WorkExperience>{
            return await this.workExperienceService.addWorkExperience(body)
        }
}