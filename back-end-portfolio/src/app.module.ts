import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SkillsService } from './skills/skills.service';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WorkExperienceModule } from './workExperience/workExperience.module';
import { WorkExperienceService } from './workExperience/workExperience.service';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';
import { AuthService } from './auth/auth.service';
import { ProjectRepository } from './project/repository/project.repository';
import { WorkExperienceRepository } from './workExperience/repository/workExperience.repository';
import { SkillRepository } from './skills/repository/skill.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SkillsModule,
    AuthModule,
    WorkExperienceModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, SkillsService, WorkExperienceService, ProjectService,AuthService, SkillRepository, WorkExperienceRepository, ProjectRepository],
})
export class AppModule {}
