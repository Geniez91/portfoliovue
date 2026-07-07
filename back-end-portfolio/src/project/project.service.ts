import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { ELoggerContext } from '@/logger/constant';
import { v4 as uuidv4 } from 'uuid';
import { Project } from './entity/project.entity.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectRepository } from './repository/project.repository';
import { ProjectMapper } from './mapper/project.mapper';

@Injectable()
export class ProjectService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    private configService: ConfigService,
    private projectRepository:ProjectRepository
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  async getAllProject(): Promise<Project[]> {
      const result = await this.projectRepository.findAll();
      this.logger.log(`${ELoggerContext.ProjectService.GetAllProject}`);
      return ProjectMapper.toEntities(result);
  }

  async findProjectByIdOrThrow(idProject: number): Promise<Project> {
    const result = await this.projectRepository.findById(idProject);

    if (!result) {
      this.logger.warn(
        `${ELoggerContext.ProjectService.FindProjectByIdOrThrow} with idProject ${idProject} not found`,
      );
      throw new NotFoundException(`Project with id ${idProject} not found`);
    }
    return ProjectMapper.toEntity(result);
  }

  async addProject(projet: CreateProjectDto,workExperienceImgs: string[]): Promise<Project> {
      const existingProject = await this.projectRepository.findByName(projet.name);
      if (existingProject) {
        this.logger.warn(
          `${ELoggerContext.ProjectService.AddProject} project with name ${projet.name} already exists`,
        );
        throw new ConflictException(`Project with name ${projet.name} already exists`);
      }

      const createInput = ProjectMapper.toCreateInput(projet, workExperienceImgs);
      const result = await this.projectRepository.createProject(createInput);
      return ProjectMapper.toEntity(result);
    }
  

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}_${file.originalname}`;
    try {
      const { data, error } = await this.supabase.storage
        .from('projet')
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
        .from('projet')
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

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const urls: string[] = [];
    for (const file of files) {
      const url = await this.uploadImage(file);
      urls.push(url);
    }
    return urls;
  }

  async deleteProject(idProject: number): Promise<Project> {
      await this.findProjectByIdOrThrow(idProject);
      const result = await this.projectRepository.deleteProject(idProject);
      return ProjectMapper.toEntity(result);
    }
  

  async updateProject(idProject: number, project: UpdateProjectDto, workExperienceImgs: string[]):Promise<Project> {
      await this.findProjectByIdOrThrow(idProject);
      
      const updateInput = ProjectMapper.toUpdateInput(project, workExperienceImgs);
      const result = await this.projectRepository.updateProject(idProject, updateInput);
      return ProjectMapper.toEntity(result);
    }
  }

