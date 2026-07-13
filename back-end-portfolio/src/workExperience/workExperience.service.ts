import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ELoggerContext } from '@/logger/constant';
import { UpdateWorkExperienceDto } from './dto/update-workExperience.dto';
import { WorkExperience } from './entity/workExperience.entity';
import { CreateWorkExperienceDto } from './dto/create-workExperience.dto';
import { WorkExperienceRepository } from './repository/workExperience.repository';
import { WorkExperienceMapper } from './mapper/workExperience.mapper';
import { StorageService } from '@/common/storage.service';
import { EStorageBucket } from '@/common/storage.enum';

@Injectable()
export class WorkExperienceService {
  private readonly logger = new Logger(WorkExperienceService.name);

  constructor(
    private workExperienceRepository:WorkExperienceRepository,
    private storageService: StorageService
  ) {
  }

  async getAllWorkExperience(): Promise<WorkExperience[]> {
      const result = await this.workExperienceRepository.findAll();
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.GetAllWorkExperience}`,
      );
      return WorkExperienceMapper.toEntities(result);
    }

    async findWorkExperienceByIdOrThrow(idWorkExperience: number): Promise<WorkExperience> {
      const result = await this.workExperienceRepository.findById(idWorkExperience);
      
      if (!result) {
        this.logger.warn(
          `${ELoggerContext.WorkExperienceService.FindWorkExperienceByIdOrThrow} with idWorkExperience ${idWorkExperience} not found`,
        );
        throw new NotFoundException(`WorkExperience with id ${idWorkExperience} not found`);
      }
      return WorkExperienceMapper.toEntity(result);
    }


  async addWorkExperience(
    file: Express.Multer.File,
    workExperience: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
      const workExperienceImg = await this.storageService.uploadFile(EStorageBucket.WorkExperience, file);

      const existingWorkExperience = await this.workExperienceRepository.findByNameCompany(workExperience.nameCompany);
      
      if (existingWorkExperience) {
        this.logger.warn(
          `${ELoggerContext.WorkExperienceService.AddWorkExperience} workExperience with nameCompany ${workExperience.nameCompany} already exists`,
        );
        throw new ConflictException(`WorkExperience with nameCompany ${workExperience.nameCompany} already exists`);
      }

      const createInput = WorkExperienceMapper.toCreateInput(workExperience, workExperienceImg);
      const result = await this.workExperienceRepository.createWorkExperience(createInput);
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.AddWorkExperience} with workExperienceImg ${workExperienceImg} and workExperience ${workExperience}`,
      );
      return WorkExperienceMapper.toEntity(result);
    }
  

  async deleteWorkExperience(idWorkExperience: number): Promise<WorkExperience> {
      await this.findWorkExperienceByIdOrThrow(idWorkExperience);
      const result = await this.workExperienceRepository.deleteWorkExperience(idWorkExperience);
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.DeleteWorkExperience} with ${idWorkExperience}`,
      );
      return WorkExperienceMapper.toEntity(result);
    }
  

  async updateWorkExperience(
    idWorkExperience: number,
    workExperience: UpdateWorkExperienceDto,
    file?: Express.Multer.File,
  ): Promise<WorkExperience> {
      let imgUrl: string | undefined;
        if (file) {
      imgUrl = await this.storageService.uploadFile(EStorageBucket.WorkExperience, file);
    }
      await this.findWorkExperienceByIdOrThrow(idWorkExperience);
      const updateInput = WorkExperienceMapper.toUpdateInput(workExperience, imgUrl);
      const result = await this.workExperienceRepository.updateWorkExperience(idWorkExperience, updateInput);
      this.logger.log(
        `${ELoggerContext.WorkExperienceService.UpdateWorkExperience} with idWorkExperience ${idWorkExperience}`,
      );
      return WorkExperienceMapper.toEntity(result);
    }


}
