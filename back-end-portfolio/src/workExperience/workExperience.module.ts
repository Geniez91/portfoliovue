import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkExperienceController } from './workExperience.controller';
import { WorkExperienceService } from './workExperience.service';
import { WorkExperienceRepository } from './repository/workExperience.repository';

@Module({
  controllers: [WorkExperienceController],
  providers: [PrismaService, WorkExperienceService,WorkExperienceRepository],
})
export class WorkExperienceModule {}
