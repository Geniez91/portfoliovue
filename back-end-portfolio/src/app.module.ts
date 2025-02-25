import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SkillsService } from './skills/skills.service';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),PrismaModule, SkillsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, SkillsService],
})
export class AppModule {}
