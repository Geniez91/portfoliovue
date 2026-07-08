import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { PrismaService } from '../prisma/prisma.service';
import { SkillRepository } from './repository/skill.repository';

@Module({
  controllers: [SkillsController],
  providers: [PrismaService, SkillsService,SkillRepository],
})
export class SkillsModule {}
