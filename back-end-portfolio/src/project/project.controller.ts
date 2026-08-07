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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/auth.guard';
import { Project } from './entity/project.entity.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResult } from '@/common/dto/pagination.interface';
import { ProjectQueryDto } from './dto/project-query.dto';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
  constructor(private projetService: ProjectService) {}

  @ApiOperation({
    summary: 'Get all projects',
    description: 'Retrieve a list of all projects.',
  })
  @ApiOkResponse({
    description: 'List of projects retrieved successfully.',
    type: Project,
    isArray: true,
  })
  @ApiQuery({name:'page',required:false,example:1,type:Number})
  @ApiQuery({name:'limit',required:false,example:10,type:Number})
  @ApiQuery({name:'search',required:false,example:'example',type:String})
  @ApiQuery({name:'sortBy',required:false,example:'name',type:String})
  @ApiQuery({name:'order',required:false,example:'asc',type:String})
  @Get()
  async findAllProject(@Query() query: ProjectQueryDto): Promise<PaginatedResult<Project>> {
    return this.projetService.getAllProject(query);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get project by ID',
    description: 'Retrieve a project by its ID.',
  })
  @ApiCreatedResponse({
    description: 'Project retrieved successfully.',
    type: Project,
  })
  @ApiConflictResponse({
    description: 'Project with the same name already exists.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. You must be authenticated to add a project.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProjectDto })
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

  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiOperation({
    summary: 'Delete project by ID',
    description: 'Delete a project by its ID.',
  })
  @ApiOkResponse({
    description: 'Project deleted successfully.',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Project not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. You must be authenticated to delete a project.',
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProject(@Param('id', new ParseIntPipe()) id: number): Promise<Project> {
    return await this.projetService.deleteProject(id);
  }

  @ApiOperation({
    summary: 'Update project by ID',
    description: 'Update a project by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Project updated successfully.',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Project not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. You must be authenticated to update a project.',
  })
  @ApiBody({ type: UpdateProjectDto })
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
