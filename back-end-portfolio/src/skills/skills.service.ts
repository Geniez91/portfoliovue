import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ELoggerContext } from '@/logger/constant';
import { Prisma } from '@prisma/client';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skills } from './entity/skill.entity';
import { SkillRepository } from './repository/skill.repository';
import { SkillMapper } from './mapper/skill.mapper';
import { StorageService } from '@/common/storage.service';
import { EStorageBucket } from '@/common/storage.enum';

@Injectable()
export class SkillsService {
  private readonly logger = new Logger(SkillsService.name);

  constructor(
    private skillRepository:SkillRepository,
    private storageService: StorageService
  ) {
  }

  async getAllSkills(): Promise<Skills[]> {
      const result = await this.skillRepository.findAll();
      return SkillMapper.toEntities(result);
  }

  async addSkills(file: Express.Multer.File, skills: CreateSkillDto): Promise<Skills> {
      const skillsImg = await this.storageService.uploadFile(EStorageBucket.Skills, file);
      const existingSkill = await this.skillRepository.findByLanguage(skills.language);

      if (existingSkill) {
         this.logger.warn(`${ELoggerContext.SkillsService.AddSkills} language ${skills.language} already exists`)
        throw new ConflictException(`Skill with language ${skills.language} already exists`)
      }

      const createInput = SkillMapper.toCreateInput(skills, skillsImg);
      const result = await this.skillRepository.createSkill(createInput);
      this.logger.log(
        `${ELoggerContext.SkillsService.AddSkills} with  file : ${file} and language : ${skills.language}`,
      );
      return SkillMapper.toEntity(result);
  }

  async findSkillByIdOrThrow(idSkills: number): Promise<Skills> {
    const result = await this.skillRepository.findById(idSkills);

    if (!result) {
    this.logger.warn(
      `${ELoggerContext.SkillsService.FindSkill} skill ${idSkills} not found`,
    );

    throw new NotFoundException(
      `Skill ${idSkills} not found`,
    );
  }
    return SkillMapper.toEntity(result);
  }

  async updateSkills(
    idSkills: number,
    skills: UpdateSkillDto,
    file?: Express.Multer.File,
  ): Promise<Skills> {
    const data: Prisma.skillsUpdateInput = {...skills,};
    let srcImg: string | undefined;

    if (file) {
         srcImg =await this.storageService.uploadFile(EStorageBucket.Skills, file);
    }

    await this.findSkillByIdOrThrow(idSkills);
    const updateInput = SkillMapper.toUpdateInput(skills, srcImg);

    const result = await this.skillRepository.updateSkill(idSkills, updateInput);
      this.logger.log(
        `${ELoggerContext.SkillsService.UpdateSkills} with idSkills ${idSkills}`,
      );
      return SkillMapper.toEntity(result);
    }
  
  async deleteSkills(idSkills: number): Promise<Skills> {
    await this.findSkillByIdOrThrow(idSkills);
    const result = await this.skillRepository.deleteSkill(idSkills);
      this.logger.log(
        `${ELoggerContext.SkillsService.DeleteSkills} with idSkills ${idSkills}`,
      );
      return SkillMapper.toEntity(result);
    } 
  

}
