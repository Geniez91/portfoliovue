import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ELoggerContext } from '@/logger/constant';
import { Project } from './entity/project.entity.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectRepository } from './repository/project.repository';
import { ProjectMapper } from './mapper/project.mapper';
import { StorageService } from '@/common/storage.service';
import { EStorageBucket } from '@/common/storage.enum';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResult } from '@/common/dto/pagination.interface';
import { ProjectQueryDto } from './dto/project-query.dto';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    private projectRepository:ProjectRepository,
    private storageService: StorageService
  ) {}

    async getAllProject(query: ProjectQueryDto): Promise<PaginatedResult<Project>> {
      const { page = 1, limit = 30, search, sortBy, order } = query ?? {};

      const skip = (page - 1) * limit;
      const [projects, totalCount] = await Promise.all([
        this.projectRepository.findAll(skip, limit,search,sortBy,order),
        this.projectRepository.countAll(),
      ]);

      this.logger.log(`${ELoggerContext.ProjectService.GetAllProject}`);
      return {
        data: ProjectMapper.toEntities(projects),
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      };  
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

  async addProject(projet: CreateProjectDto, files: Express.Multer.File[]): Promise<Project> {
      const workExperienceImgs = await this.storageService.uploadManyFiles(EStorageBucket.Projects, files);
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

  async deleteProject(idProject: number): Promise<Project> {
      await this.findProjectByIdOrThrow(idProject);
      const result = await this.projectRepository.deleteProject(idProject);
      return ProjectMapper.toEntity(result);
    }
  

  async updateProject(idProject: number, project: UpdateProjectDto, files: Express.Multer.File[]):Promise<Project> {
      const workExperienceImgs = await this.storageService.uploadManyFiles(EStorageBucket.Projects, files);
      await this.findProjectByIdOrThrow(idProject);
      
      const updateInput = ProjectMapper.toUpdateInput(project, workExperienceImgs);
      const result = await this.projectRepository.updateProject(idProject, updateInput);
      return ProjectMapper.toEntity(result);
    }
  }

