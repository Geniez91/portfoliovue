import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkExperienceService } from "./workExperience.service";
import { WorkExperience } from "./workExperience.interface";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "@/auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('workExperience')
export class WorkExperienceController {
        constructor(private workExperienceService:WorkExperienceService){}
        @Get()
        async findAllWorkExperience():Promise<WorkExperience[]>{
            return this.workExperienceService.getAllWorkExperience();
        }

        @ApiBody({type:WorkExperience})
        @Post()
        @UseInterceptors(FileInterceptor('file'))
        @ApiConsumes('multipart/form-data')
        @UseGuards(AuthGuard)
        @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
        async addSkills(@UploadedFile() file:Express.Multer.File,@Body() body:WorkExperience):Promise<WorkExperience>{
            const workExperienceImg=await this.workExperienceService.uploadImage(file)
            if (typeof body.stack === 'string') {
                try {
                  body.stack = JSON.parse(body.stack);
             
                }
                catch(error){
                    throw error
                }
        }
        return await this.workExperienceService.addWorkExperience(workExperienceImg,body)
}
}