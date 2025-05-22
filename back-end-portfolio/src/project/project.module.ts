import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  controllers: [ProjectController],
  providers:[PrismaService,ProjectService]
})
export class ProjectModule {}
