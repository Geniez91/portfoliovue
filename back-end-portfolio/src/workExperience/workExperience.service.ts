import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { WorkExperience } from "./workExperience.interface";
import { plainToInstance } from "class-transformer";
import { ELoggerContext } from "@/logger/constant";
import { v4 as uuidv4 } from 'uuid';

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
    return plainToInstance(WorkExperience, result);
    }

    async addWorkExperience(workExperienceImg:string,workExperience:WorkExperience):Promise<WorkExperience>{
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
                    srcImg:workExperienceImg
                }
            })
            this.logger.log(`${ELoggerContext.WorkExperienceService.AddWorkExperience}`)
            return plainToInstance(WorkExperience, result, { excludeExtraneousValues: true });
        }
        catch(error){
            throw error;
        }
    }

    async uploadImage(file:Express.Multer.File):Promise<string>{
        const fileName = `${uuidv4()}_${file.originalname}`; 
        try{
            const { data, error } = await this.supabase.storage.from('workexperience').upload(fileName, file.buffer, {
                contentType: file.mimetype,
                cacheControl: '3600',
                upsert: true,
            });
            if (error) {
                console.log(error)
                throw new Error('Error getting public URL');
            }
            const {data:publicUrlData}=await this.supabase.storage.from('workexperience').getPublicUrl(fileName)
            this.logger.log(`${ELoggerContext.SkillsService.UploadImage} with file ${file}`)
            return publicUrlData.publicUrl
        }
        catch(error){
            this.logger.error(`${ELoggerContext.SkillsService.UploadImage} with file ${file} with an error ${error}`)
            throw error
        }
    }
    }
        
