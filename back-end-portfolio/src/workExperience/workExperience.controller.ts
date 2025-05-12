import { Body, Controller, Delete, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkExperienceService } from "./workExperience.service";
import { WorkExperience } from "./workExperience.interface";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "@/auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

@Controller('workExperience')
export class WorkExperienceController {
        constructor(private workExperienceService:WorkExperienceService){}
        @Get()
        async findAllWorkExperience():Promise<WorkExperience[]>{
            return this.workExperienceService.getAllWorkExperience();
        }

        @Post()
        @UseInterceptors(FileInterceptor('file'))
        @ApiConsumes('multipart/form-data')
        @UseGuards(AuthGuard)
        async addSkills(
          @UploadedFile() file: Express.Multer.File,
          @Body() body: any
        ): Promise<WorkExperience> {
          const workExperienceImg = await this.workExperienceService.uploadImage(file);
            const transformed = plainToInstance(WorkExperience, {
            ...body,
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
            stack: JSON.parse(body.stack),
            tasks:JSON.parse(body.tasks)

          });
          await validateOrReject(transformed);
          return await this.workExperienceService.addWorkExperience(workExperienceImg,transformed);
}

@Delete()
@UseGuards(AuthGuard)
async deleteWorkExperience(@Query('id')id:number):Promise<WorkExperience>{
  return await this.workExperienceService.deleteWorkExperience(id)
}

}