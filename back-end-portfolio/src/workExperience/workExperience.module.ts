import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkExperienceController } from './workExperience.controller';
import { WorkExperienceService } from './workExperience.service';
import { WorkExperienceRepository } from './repository/workExperience.repository';
import { StorageModule } from '@/common/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [WorkExperienceController],
  providers: [PrismaService, WorkExperienceService,WorkExperienceRepository],
})
export class WorkExperienceModule {}
