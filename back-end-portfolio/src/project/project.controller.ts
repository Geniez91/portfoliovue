import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/auth.guard';
import { Project } from './entity/project.entity.dto';
import { WorkExperience } from '@/workExperience/entity/workExperience.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private projetService: ProjectService) {}

  @Get()
  async findAllProject(): Promise<Project[]> {
    return this.projetService.getAllProject();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  async addProject(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateProjectDto,
  ): Promise<Project> {
    return await this.projetService.addProject(body,files);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProject(@Param('id', new ParseIntPipe()) id: number): Promise<Project> {
    return await this.projetService.deleteProject(id);
  }

  @ApiBody({ type: WorkExperience })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('file'))
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProjectDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Project> {
    return await this.projetService.updateProject(id, body, files);
  }
}
