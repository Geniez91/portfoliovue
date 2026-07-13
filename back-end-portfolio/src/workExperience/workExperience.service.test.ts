import { WorkExperienceService } from './workExperience.service';
import { ConfigService } from '@nestjs/config';
import {
  ADD_EXPERIENCE,
  ALL_WORK_EXPERIENCES,
  ALL_WORK_EXPERIENCES_TRANSFORMED,
  DELETE_EXPERIENCE
} from '../../test/workExperience';

import {MOCK_FILE} from '../../test/common'
import { ConflictException, NotFoundException } from '@nestjs/common';
import { WorkExperienceRepository } from './repository/workExperience.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from '@/common/storage.service';
import { WorkExperienceMapper } from './mapper/workExperience.mapper';

describe('workExperienceService', () => {
 let service: WorkExperienceService;
 let repository:WorkExperienceRepository;
 let module: TestingModule;

   const repositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByNameCompany:jest.fn(),
    createWorkExperience: jest.fn(),
    deleteWorkExperience: jest.fn(),
    updateWorkExperience: jest.fn(),
  }

  const storageMock={
    uploadFile: jest.fn(),
  }

    const configMock = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        WorkExperienceService,
        {
          provide: WorkExperienceRepository,
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
  
    service = module.get<WorkExperienceService>(WorkExperienceService);
    repository = module.get<WorkExperienceRepository>(WorkExperienceRepository);
    jest.clearAllMocks();
  });



  describe('getAllWorkExperience', () => {
    it('should return all the workExperiences', async () => {
      repositoryMock.findAll.mockResolvedValue(ALL_WORK_EXPERIENCES);

      const result = await service.getAllWorkExperience();

      expect(result).toEqual(ALL_WORK_EXPERIENCES_TRANSFORMED);
      expect(repositoryMock.findAll).toHaveBeenCalled();
    });

    it('should return an error', async () => {
      repositoryMock.findAll.mockRejectedValue(new Error());

      await expect(
        service.getAllWorkExperience(),
      ).rejects.toThrow();
    });
  });

  describe('addWorkExperience', () => {
    it('should add work experiences', async () => {
      storageMock.uploadFile.mockResolvedValue('img');
      repositoryMock.findByNameCompany.mockResolvedValue(null);
      repositoryMock.createWorkExperience.mockResolvedValue(ADD_EXPERIENCE);

      const result = await service.addWorkExperience(MOCK_FILE, ADD_EXPERIENCE);

      expect(storageMock.uploadFile).toHaveBeenCalled();
      expect(repositoryMock.createWorkExperience).toHaveBeenCalled();
      expect(result).toEqual(WorkExperienceMapper.toEntity(ADD_EXPERIENCE));


    });

    it('should return an conflict exception', async () => {
      repositoryMock.findByNameCompany.mockResolvedValue(ADD_EXPERIENCE);

      await expect(
        service.addWorkExperience(MOCK_FILE, ADD_EXPERIENCE),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('deleteWorkExperience', () => {
    it('should delete work experience', async () => {
      repositoryMock.findById.mockResolvedValue(ADD_EXPERIENCE);
      repositoryMock.deleteWorkExperience.mockResolvedValue(DELETE_EXPERIENCE);

      await service.deleteWorkExperience(1);

      expect(repositoryMock.deleteWorkExperience).toHaveBeenCalledWith(1);
    });

    it('should throw an exception not found', async () => {
      repositoryMock.findById.mockResolvedValue(null)

      await expect(
        service.deleteWorkExperience(1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateWorkExperience', () => {
    it('should update work experience', async () => {
      repositoryMock.findById.mockResolvedValue(ADD_EXPERIENCE);
      repositoryMock.updateWorkExperience.mockResolvedValue(ADD_EXPERIENCE);

      await service.updateWorkExperience(1, ADD_EXPERIENCE);

      expect(repositoryMock.updateWorkExperience).toHaveBeenCalledWith(1, ADD_EXPERIENCE);
    });

    it('should throw an exception not found', async () => {
      repositoryMock.findById.mockResolvedValue(null);
      repositoryMock.updateWorkExperience.mockRejectedValue(new NotFoundException());

      await expect(
        service.updateWorkExperience(1, ADD_EXPERIENCE),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
