import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { plainToInstance } from 'class-transformer';
import { ELoggerContext } from '@/logger/constant';
import { v4 as uuidv4 } from 'uuid';
import { UpdateWorkExperienceDto } from './dto/update-workExperience.dto';
import { WorkExperience } from './entity/workExperience.entity';
import { CreateWorkExperienceDto } from './dto/create-workExperience.dto';
import { WorkExperienceRepository } from './repository/workExperience.repository';

@Injectable()
export class WorkExperienceService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(WorkExperienceService.name);

  constructor(
    private configService: ConfigService,
    private workExperienceRepository:WorkExperienceRepository
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  async getAllWorkExperience(): Promise<WorkExperience[]> {
      const result = await this.workExperienceRepository.findAll();
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.GetAllWorkExperience}`,
      );
      return plainToInstance(WorkExperience, result);
    }

    async findWorkExperienceByIdOrThrow(idWorkExperience: number): Promise<WorkExperience> {
      const result = await this.workExperienceRepository.findById(idWorkExperience);
      
      if (!result) {
        this.logger.warn(
          `${ELoggerContext.WorkExperienceService.FindWorkExperienceByIdOrThrow} with idWorkExperience ${idWorkExperience} not found`,
        );
        throw new NotFoundException(`WorkExperience with id ${idWorkExperience} not found`);
      }
      return plainToInstance(WorkExperience, result);
    }


  async addWorkExperience(
    workExperienceImg: string,
    workExperience: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
      const existingWorkExperience = await this.workExperienceRepository.findByNameCompany(workExperience.nameCompany);
      
      if (existingWorkExperience) {
        this.logger.warn(
          `${ELoggerContext.WorkExperienceService.AddWorkExperience} workExperience with nameCompany ${workExperience.nameCompany} already exists`,
        );
        throw new ConflictException(`WorkExperience with nameCompany ${workExperience.nameCompany} already exists`);
      }

      const result = await this.workExperienceRepository.createWorkExperience(workExperience, workExperienceImg);
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.AddWorkExperience} with workExperienceImg ${workExperienceImg} and workExperience ${workExperience}`,
      );
      return plainToInstance(WorkExperience, result, {
        excludeExtraneousValues: true,
      });
    }
  

  async deleteWorkExperience(idWorkExperience: number): Promise<WorkExperience> {
      await this.findWorkExperienceByIdOrThrow(idWorkExperience);
      const result = await this.workExperienceRepository.deleteWorkExperience(idWorkExperience);
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.DeleteWorkExperience} with ${idWorkExperience}`,
      );
      return plainToInstance(WorkExperience, result, {
        excludeExtraneousValues: true,
      });
    }
  

  async updateWorkExperience(
    idWorkExperience: number,
    workExperience: UpdateWorkExperienceDto,
    workExperienceImg?: string,
  ): Promise<WorkExperience> {
      await this.findWorkExperienceByIdOrThrow(idWorkExperience);
      const result = await this.workExperienceRepository.updateWorkExperience(idWorkExperience, workExperience, workExperienceImg);
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.UpdateWorkExperience} with idWorkExperience ${idWorkExperience}`,
      );
      return plainToInstance(WorkExperience, result, {
        excludeExtraneousValues: true,
      });
    }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}_${file.originalname}`;
    try {
      const { data, error } = await this.supabase.storage
        .from('workexperience')
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
        .from('workexperience')
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
