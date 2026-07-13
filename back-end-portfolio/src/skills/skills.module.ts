import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { PrismaService } from '../prisma/prisma.service';
import { SkillRepository } from './repository/skill.repository';
import { StorageService } from '@/common/storage.service';
import { StorageModule } from '@/common/storage.module';

@Module({
  imports:[
    StorageModule
  ],
  controllers: [SkillsController],
  providers: [PrismaService, SkillsService,SkillRepository],
})
export class SkillsModule {}
