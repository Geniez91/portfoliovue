import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WorkExperienceService } from './workExperience.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkExperience } from './entity/workExperience.entity';
import { CreateWorkExperienceDto } from './dto/create-workExperience.dto';
import { UpdateWorkExperienceDto } from './dto/update-workExperience.dto';
import { StorageService } from '@/common/storage.service';

@Controller('workExperience')
export class WorkExperienceController {
  constructor(private workExperienceService: WorkExperienceService) {}
  @Get()
  async findAllWorkExperience(): Promise<WorkExperience[]> {
    return this.workExperienceService.getAllWorkExperience();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  async addSkills(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
    return await this.workExperienceService.addWorkExperience(file,body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteWorkExperience(@Param('id', ParseIntPipe) id: number): Promise<WorkExperience> {
    return await this.workExperienceService.deleteWorkExperience(id);
  }

  @ApiBody({ type: UpdateWorkExperienceDto })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateSkills(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWorkExperienceDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<WorkExperience> {
    return this.workExperienceService.updateWorkExperience(id, body, file);
  }
}
