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
import { SkillsService } from './skills.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skills } from './entity/skill.entity';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private skillService: SkillsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all skills',
    description: 'Retrieve a list of all skills.',
  })
  @ApiOkResponse({
    description: 'List of skills retrieved successfully.',
    type: Skills,
    isArray: true,
  })
  async findAllSkills(): Promise<Skills[]> {
    return this.skillService.getAllSkills();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get skill by ID',
    description: 'Retrieve a skill by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example:1
  })
  @ApiOkResponse({
    description:'Skill retrieved successfully.',
    type: Skills,
  })
  @ApiNotFoundResponse({
    description: 'Skill not found.',
  })
  async findSkillsById(@Param('id', ParseIntPipe) id: number): Promise<Skills> {
    return this.skillService.findSkillByIdOrThrow(id);
  }

  @ApiBody({ type: CreateSkillDto })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add a new skill',
    description: 'Add a new skill with an optional image.',
  })
  @ApiCreatedResponse({
    description: 'Skill created successfully.',
    type: Skills,
  })
  @ApiConflictResponse({
    description: 'Skill with the same language already exists.',
  })
  @ApiUnauthorizedResponse({
    description:' Unauthorized. You must be authenticated to add a skill.',
  })
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addSkills(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSkillDto,
  ): Promise<Skills> {
    return this.skillService.addSkills(file, body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a skill',
    description: 'Update an existing skill by its ID with an optional image.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example:1
  })
  @ApiOkResponse({
    description: 'Skill updated successfully.',
    type: Skills,
  })
  @ApiNotFoundResponse({
    description: 'Skill not found.',
  })
  @ApiUnauthorizedResponse({
    description:' Unauthorized. You must be authenticated to update a skill.',
  })
  @ApiBody({ type: UpdateSkillDto })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateSkills(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSkillDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Skills> {
    return this.skillService.updateSkills(id, body, file);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a skill',
    description: 'Delete an existing skill by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example:1
  })
  @ApiOkResponse({
    description: 'Skill deleted successfully.',
    type: Skills,
  })
  @ApiNotFoundResponse({
    description: 'Skill not found.',
  })
  @ApiUnauthorizedResponse({
    description:' Unauthorized. You must be authenticated to delete a skill.',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteSkills(@Param('id', ParseIntPipe) id: number): Promise<Skills> {
    return this.skillService.deleteSkills(id);
  }

}
