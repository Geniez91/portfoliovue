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
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkExperience } from './entity/workExperience.entity';
import { CreateWorkExperienceDto } from './dto/create-workExperience.dto';
import { UpdateWorkExperienceDto } from './dto/update-workExperience.dto';

@ApiTags('Work Experience')
@Controller('workExperience')
export class WorkExperienceController {
  constructor(private workExperienceService: WorkExperienceService) {}

  @ApiOperation({
    summary: 'Get all work experiences',
    description: 'Retrieve a list of all work experiences.',
  })
  @ApiOkResponse({
    description: 'List of work experiences retrieved successfully.',
    type: WorkExperience,
    isArray: true,
  })
  @Get()
  async findAllWorkExperience(): Promise<WorkExperience[]> {
    return this.workExperienceService.getAllWorkExperience();
  }

  @ApiBody({ type: CreateWorkExperienceDto })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add a new work experience',
    description: 'Add a new work experience with an optional image.',
  })
  @ApiCreatedResponse({
    description: 'Work experience added successfully.',
    type: WorkExperience,
  })
  @ApiConflictResponse({
    description: 'Work experience with the same details already exists.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. You must be authenticated to add a work experience.',
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  async addWorkExperience(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
    return await this.workExperienceService.addWorkExperience(file,body);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a work experience',
    description: 'Delete a work experience by its ID.',
  })
  @ApiOkResponse({
    description: 'Work experience deleted successfully.',
    type: WorkExperience,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. You must be authenticated to delete a work experience.',
  })
  @ApiNotFoundResponse({
    description: 'Work experience not found.',
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteWorkExperience(@Param('id', ParseIntPipe) id: number): Promise<WorkExperience> {
    return await this.workExperienceService.deleteWorkExperience(id);
  }

  @ApiOperation({
    summary: 'Update a work experience',
    description: 'Update an existing work experience by its ID with an optional image.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Work experience updated successfully.',
    type: WorkExperience,
  })
  @ApiNotFoundResponse({
    description: 'Work experience not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. You must be authenticated to update a work experience.',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateWorkExperienceDto })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateWorkExperience(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWorkExperienceDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<WorkExperience> {
    return this.workExperienceService.updateWorkExperience(id, body, file);
  }
}
