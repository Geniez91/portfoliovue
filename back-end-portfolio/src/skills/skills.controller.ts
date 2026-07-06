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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skills } from './entity/skill.entity';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private skillService: SkillsService) {}
  @Get()
  async findAllSkills(): Promise<Skills[]> {
    return this.skillService.getAllSkills();
  }

  @Get(':id')
  async findSkillsById(@Param('id', ParseIntPipe) id: number): Promise<Skills> {
    return this.skillService.findSkillByIdOrThrow(id);
  }

  @ApiBody({ type: CreateSkillDto })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addSkills(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSkillDto,
  ): Promise<Skills> {
    const skillsImg = await this.skillService.uploadImage(file);
    return this.skillService.addSkills(skillsImg, body);
  }

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

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteSkills(@Param('id', ParseIntPipe) id: number): Promise<Skills> {
    return this.skillService.deleteSkills(id);
  }

}
