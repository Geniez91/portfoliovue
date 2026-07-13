import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { SkillsService } from './skills.service';
import {
  ADD_SKILL,
  ALL_SKILLS,
  ALL_SKILLS_TRANSFORMED,
  DELETE_SKILL,
} from '../../test/skills';
import { SkillRepository } from './repository/skill.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { SkillMapper } from './mapper/skill.mapper';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { StorageService } from '@/common/storage.service';
import { MOCK_FILE } from '../../test/common';


describe('SkillService', () => {
  let repository: SkillRepository;
  let skillService: SkillsService;
  let module: TestingModule;

  const repositoryMock = {
    findAll: jest.fn(),
    findByLanguage: jest.fn(),
    createSkill:jest.fn(),
    findById: jest.fn(),
    updateSkill: jest.fn(),
    deleteSkill: jest.fn(),
  }

  const storageMock = {
    uploadFile: jest.fn(),
  }
  
    const configMock = {
    get: jest.fn(),
  };

beforeEach(async () => {
  module = await Test.createTestingModule({
    providers: [
      SkillsService,
      {
        provide: SkillRepository,
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

  skillService = module.get<SkillsService>(SkillsService);
  repository = module.get<SkillRepository>(SkillRepository);
  jest.clearAllMocks();
});

  describe('getAllSkills', () => {
    it('should return all the skills', async () => {
      repositoryMock.findAll.mockResolvedValue(ALL_SKILLS);
      
      const result = await skillService.getAllSkills();

      expect(repositoryMock.findAll).toHaveBeenCalled();
      expect(result).toEqual(ALL_SKILLS_TRANSFORMED);
    });

    it('should throw an error', async () => {
      repositoryMock.findAll.mockRejectedValue(new Error());

      await expect(skillService.getAllSkills).rejects.toThrow();
    });
  });

  describe('addSkills', () => {
    it('should add skill', async () => {
      repositoryMock.findByLanguage.mockResolvedValue(null);
      repositoryMock.createSkill.mockResolvedValue(ADD_SKILL);

      const result = await skillService.addSkills(MOCK_FILE, ADD_SKILL);

      expect(repositoryMock.findByLanguage).toHaveBeenCalledWith(ADD_SKILL.language);
      expect(repositoryMock.createSkill).toHaveBeenCalled()
      expect(result).toEqual(SkillMapper.toEntity(ADD_SKILL));
    });

    it('should throw a conflict error', async () => {
      repositoryMock.findByLanguage.mockResolvedValue(ADD_SKILL);

      await expect(skillService.addSkills(MOCK_FILE, ADD_SKILL)).rejects.toThrow(ConflictException);
    });
  });

  describe('deleteSkill', () => {
    it('should delete skills', async () => {
      repositoryMock.findById.mockResolvedValue(ADD_SKILL);
      repositoryMock.deleteSkill.mockResolvedValue(DELETE_SKILL);

     const result= await skillService.deleteSkills(1);

      expect(repositoryMock.findById).toHaveBeenCalledWith(1);
      expect(repositoryMock.deleteSkill).toHaveBeenCalledWith(1);
      expect(result).toEqual(SkillMapper.toEntity(DELETE_SKILL));
    });

    it('should throw an exception not found', async () => {
      repositoryMock.findById.mockResolvedValue(null);

      await expect(skillService.deleteSkills(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateSkills', () => {
    it('should update skills', async () => {
      repositoryMock.findById.mockResolvedValue(ADD_SKILL);
      repositoryMock.updateSkill.mockResolvedValue(ADD_SKILL);

      await skillService.updateSkills(1,ADD_SKILL);

      expect(repositoryMock.findById).toHaveBeenCalledWith(1);
      expect(repositoryMock.updateSkill).toHaveBeenCalledWith(1, SkillMapper.toUpdateInput(ADD_SKILL, undefined));
    });

    it('should throw an exception not found', async () => {
      repositoryMock.findById.mockResolvedValue(null);

      await expect(skillService.updateSkills(1, ADD_SKILL)).rejects.toThrow(NotFoundException);
    });
  });
});
