import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './repository/project.repository';
import { StorageModule } from '@/common/storage.module';

@Module({
  imports:[
    StorageModule
  ],
  controllers: [ProjectController],
  providers: [PrismaService, ProjectService,ProjectRepository],
})
export class ProjectModule {}
