import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { WorkExperience } from "./workExperience.interface";
import { plainToInstance } from "class-transformer";
import { ELoggerContext } from "@/logger/constant";

@Injectable()
export class WorkExperienceService {
     private supabase:SupabaseClient;
     private readonly logger=new Logger(WorkExperienceService.name)
     
    constructor(private prisma:PrismaService, private configService: ConfigService){
                this.supabase=createClient(
                    this.configService.get<string>('SUPABASE_URL')!,
                    this.configService.get<string>('SUPABASE_ANON_KEY')!
                )
    }

    async getAllWorkExperience(): Promise<WorkExperience[]> {
    const result = await this.prisma.workExperience.findMany();
    const resultArray = Array.isArray(result) ? result : [result]; 
    return plainToInstance(WorkExperience, resultArray, { excludeExtraneousValues: true });
    }

    async addWorkExperience(workExperience:WorkExperience):Promise<WorkExperience>{
        try{
            const result=await this.prisma.workExperience.create({
                data:{
                    content:workExperience.content,
                    endDate:workExperience.endDate,
                    nameCompany:workExperience.nameCompany,
                    job:workExperience.job,
                    stack:workExperience.stack as [],
                    tasks:workExperience.tasks,
                    startDate:workExperience.startDate,
                }
            })
            this.logger.log(`${ELoggerContext.WorkExperienceService.AddWorkExperience}`)
            return plainToInstance(WorkExperience, result, { excludeExtraneousValues: true });
        }
        catch(error){
            throw error;
        }
    }
        
}