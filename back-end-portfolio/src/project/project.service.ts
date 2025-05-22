import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service"
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { Project } from './project.interface';
import { plainToInstance } from 'class-transformer';
import { ELoggerContext } from '@/logger/constant';

@Injectable()
export class ProjectService {
     private supabase:SupabaseClient;
     private readonly logger=new Logger(ProjectService.name)
     
    constructor(private prisma:PrismaService, private configService: ConfigService){
                this.supabase=createClient(
                    this.configService.get<string>('SUPABASE_URL')!,
                    this.configService.get<string>('SUPABASE_ANON_KEY')!
                )
    }

    async getAllProject():Promise<Project[]>{
        try{
            const result=await this.prisma.project.findMany()
            this.logger.log(`${ELoggerContext.ProjectService.GetAllProject}`)
            return plainToInstance(Project,result)
        }
        catch(error){
             this.logger.error(`${ELoggerContext.ProjectService.GetAllProject} with error ${error}`)
            throw error
        }
    }

}