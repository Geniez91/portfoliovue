import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkExperienceController } from './workExperience.controller';
import { WorkExperienceService } from './workExperience.service';

@Module({
  controllers: [WorkExperienceController],
  providers:[PrismaService,WorkExperienceService]
})
export class WorkExperienceModule {}
