import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './repository/project.repository';

@Module({
  controllers: [ProjectController],
  providers: [PrismaService, ProjectService,ProjectRepository],
})
export class ProjectModule {}
