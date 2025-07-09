import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ProjectService } from './project.service';
import {
  ADD_PROJECT,
  ALL_PROJECT,
  ALL_PROJECT_TRANSFORMED,
  DELETE_PROJECT,
} from '../../test/project';

describe('ProjectService', () => {
  let prisma = new PrismaService();
  let configService = new ConfigService();
  let projectService = new ProjectService(prisma, configService);

  describe('getAllProject', () => {
    it('should return all the project', async () => {
      prisma.project.findMany = jest.fn().mockResolvedValue(ALL_PROJECT);
      const result = await projectService.getAllProject();
      expect(result).toEqual(ALL_PROJECT_TRANSFORMED);
    });

    it('should throw an error', async () => {
      prisma.project.findMany = jest.fn().mockRejectedValue(new Error());

      await expect(projectService.getAllProject).rejects.toThrow();
    });
  });

  describe('addProject', () => {
    it('should add project', async () => {
      prisma.project.create = jest.fn().mockResolvedValue(ADD_PROJECT);

      await projectService.addProject(ADD_PROJECT);

      expect(prisma.project.create).toHaveBeenCalledWith({
        data: ADD_PROJECT,
      });
    });

    it('should throw an error', async () => {
      prisma.project.create = jest.fn().mockRejectedValue(new Error());

      await expect(projectService.addProject).rejects.toThrow();
    });
  });

  describe('deleteProject', () => {
    it('should delete project', async () => {
      prisma.project.delete = jest.fn().mockResolvedValue(DELETE_PROJECT);

      await projectService.deleteProject(1);

      expect(prisma.project.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });

    it('should throw an error', async () => {
      prisma.project.delete = jest.fn().mockRejectedValue(new Error());

      await expect(projectService.deleteProject).rejects.toThrow();
    });
  });

  describe('updateProject', () => {
    it('should update project', async () => {
      prisma.project.update = jest.fn().mockResolvedValue(ADD_PROJECT);

      await projectService.updateProject(1, ADD_PROJECT);

      expect(prisma.project.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: ADD_PROJECT,
      });
    });

    it('should throw an error', async () => {
      prisma.project.update = jest.fn().mockRejectedValue(new Error());

      await expect(prisma.project.update).rejects.toThrow();
    });
  });
});
