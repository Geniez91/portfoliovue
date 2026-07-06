import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { ELoggerContext } from '@/logger/constant';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skills } from './entity/skill.entity';

@Injectable()
export class SkillsService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SkillsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  async getAllSkills(): Promise<Skills[]> {
      const result = await this.prisma.skills.findMany();
      return plainToInstance(Skills, result, {
        excludeExtraneousValues: true,
      });
  }

  async addSkills(file: string, skills: CreateSkillDto): Promise<Skills> {
      const existingSkill = await this.prisma.skills.findFirst({
        where: {
          language: skills.language
        }
      });

      if (existingSkill) {
         this.logger.warn(`${ELoggerContext.SkillsService.AddSkills} language ${skills.language} already exists`)
        throw new ConflictException(`Skill with language ${skills.language} already exists`)
      }

      const result = await this.prisma.skills.create({
        data: {
          idType: skills.idType,
          language: skills.language,
          usageExperience: skills.usageExperience,
          yearsExperience: skills.yearsExperience,
          srcImg: file,
          level: skills.level,
          TOIEC: skills.TOIEC,
        },
      });
      this.logger.log(
        `${ELoggerContext.SkillsService.AddSkills} with  file : ${file} and language : ${skills.language}`,
      );
      return plainToInstance(Skills, result, { excludeExtraneousValues: true });
  }

  async findSkillByIdOrThrow(idSkills: number): Promise<Skills> {
    const result = await this.prisma.skills.findUnique({
      where: {
        id: idSkills,
      },
    });

    if (!result) {
    this.logger.warn(
      `${ELoggerContext.SkillsService.FindSkill} skill ${idSkills} not found`,
    );

    throw new NotFoundException(
      `Skill ${idSkills} not found`,
    );
  }
    return plainToInstance(Skills, result, { excludeExtraneousValues: true });
  }

  async updateSkills(
    idSkills: number,
    skills: UpdateSkillDto,
    file?: Express.Multer.File,
  ): Promise<Skills> {
    const data: Prisma.skillsUpdateInput = {...skills,};
    
    if (file) {
         data.srcImg =await this.uploadImage(file);
    }

    await this.findSkillByIdOrThrow(idSkills);

    const result = await this.prisma.skills.update({
        data: data,
        where: {
          id: idSkills,
        },
      });
      this.logger.log(
        `${ELoggerContext.SkillsService.UpdateSkills} with idSkills ${idSkills}`,
      );
      return plainToInstance(Skills, result, { excludeExtraneousValues: true });
    }
  
  async deleteSkills(idSkills: number): Promise<Skills> {
    await this.findSkillByIdOrThrow(idSkills);
      const result = await this.prisma.skills.delete({
        where: {
          id: idSkills,
        },
      });
      this.logger.log(
        `${ELoggerContext.SkillsService.DeleteSkills} with idSkills ${idSkills}`,
      );
      return plainToInstance(Skills, result, { excludeExtraneousValues: true });
    } 
  
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}_${file.originalname}`;
    try {
      const { data, error } = await this.supabase.storage
        .from('skills')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: true,
        });
      if (error) {
        console.log(error);
        throw new Error('Error getting public URL');
      }
      const { data: publicUrlData } = await this.supabase.storage
        .from('skills')
        .getPublicUrl(fileName);
      this.logger.log(
        `${ELoggerContext.SkillsService.UploadImage} with file ${file}`,
      );
      return publicUrlData.publicUrl;
    } catch (error) {
      this.logger.error(
        `${ELoggerContext.SkillsService.UploadImage} with file ${file} with an error ${error}`,
      );
      throw error;
    }
  }
}
