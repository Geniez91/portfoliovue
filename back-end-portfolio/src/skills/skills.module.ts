import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SkillsController],
  providers:[PrismaService,SkillsService]
})
export class SkillsModule {}
