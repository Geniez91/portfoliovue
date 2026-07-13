import { Test, TestingModule } from '@nestjs/testing';
import {
  ADD_PROJECT,
  ALL_PROJECT,
  ALL_PROJECT_TRANSFORMED,
  DELETE_PROJECT,
} from '../../test/project';
import { ProjectRepository } from './repository/project.repository';
import { ProjectService } from './project.service';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { StorageService } from '@/common/storage.service';
import { MOCK_FILE } from '../../test/common';
import { ProjectMapper } from './mapper/project.mapper';
import { EStorageBucket } from '@/common/storage.enum';

describe('ProjectService', () => {
  let service:ProjectService;
  let repository:ProjectRepository;
  let module: TestingModule;

  const repositoryMock = {
    findAll: jest.fn(),
    createProject:jest.fn(),
    deleteProject: jest.fn(),
    updateProject: jest.fn(),
    findByName: jest.fn(),
    findById:jest.fn(),
  }

  const configMock = {
      get: jest.fn(),
    };

  const storageMock = {
    uploadManyFiles: jest.fn(),
  }
  
    beforeEach(async () => {
      module = await Test.createTestingModule({
        providers: [
          ProjectService,
          {
            provide: ProjectRepository,
            useValue: repositoryMock,
          },
          {
            provide: ConfigService,
            useValue: configMock,
          },
          {
            provide: StorageService,
            useValue: storageMock,
          }
        ],
      }).compile();
    
      service = module.get<ProjectService>(ProjectService);
      repository = module.get<ProjectRepository>(ProjectRepository);
      jest.clearAllMocks();
    });
  

  describe('getAllProject', () => {
    it('should return all the project', async () => {
      repositoryMock.findAll.mockResolvedValue(ALL_PROJECT);
      const result = await service.getAllProject();
      expect(result).toEqual(ALL_PROJECT_TRANSFORMED);
    });

    it('should throw an error', async () => {
      repositoryMock.findAll.mockRejectedValue(new Error());

      await expect(service.getAllProject).rejects.toThrow();
    });
  });

  describe('addProject', () => {
    it('should add project', async () => {
      storageMock.uploadManyFiles.mockResolvedValue(['test'])
      repositoryMock.findById.mockResolvedValue(null);
      repositoryMock.createProject.mockResolvedValue(ADD_PROJECT);

      const result = await service.addProject(ADD_PROJECT,[MOCK_FILE]);

      expect(storageMock.uploadManyFiles).toHaveBeenCalledWith(EStorageBucket.Projects, [MOCK_FILE]);
      expect(repositoryMock.findByName).toHaveBeenCalledWith(ADD_PROJECT.name);
      expect(repositoryMock.createProject).toHaveBeenCalledWith(ProjectMapper.toCreateInput(ADD_PROJECT, ['test']));
      expect(result).toEqual(ProjectMapper.toEntity(ADD_PROJECT));
    });

    it('should throw an conflict error', async () => {
      storageMock.uploadManyFiles.mockResolvedValue(['test'])
      repositoryMock.createProject.mockRejectedValue(new Error());

      await expect(service.addProject).rejects.toThrow();
    });
  });

  describe('deleteProject', () => {
    it('should delete project', async () => {
      repositoryMock.findById.mockResolvedValue(ADD_PROJECT);
      repositoryMock.deleteProject.mockResolvedValue(DELETE_PROJECT);

      await service.deleteProject(1);

      expect(repositoryMock.deleteProject).toHaveBeenCalledWith(1);
      });
    
    it('should throw an not found error', async () => {
      repositoryMock.findById.mockResolvedValue(null);

      await expect(service.deleteProject(1)).rejects.toThrow(NotFoundException);
      expect(repositoryMock.deleteProject).not.toHaveBeenCalled();
    });
  });

  describe('updateProject', () => {
    it('should update project', async () => {
      storageMock.uploadManyFiles.mockResolvedValue(['test'])
      repositoryMock.findById.mockResolvedValue(ADD_PROJECT);
      repositoryMock.updateProject.mockResolvedValue(ADD_PROJECT);

      await service.updateProject(1, ADD_PROJECT, [MOCK_FILE]);

      expect(repositoryMock.updateProject).toHaveBeenCalledWith(1, ProjectMapper.toUpdateInput(ADD_PROJECT, ['test']));
    });

    it('should throw an error', async () => {
      storageMock.uploadManyFiles.mockResolvedValue(['test'])
      repositoryMock.findById.mockResolvedValue(null);

      await expect(service.updateProject(1, ADD_PROJECT, [MOCK_FILE])).rejects.toThrow(NotFoundException);
    });
  });
});
