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
        try{
            const result = await this.prisma.workExperience.findMany({
                orderBy:{
                    startDate:'desc'
                }
            });
            this.logger.log(`${ELoggerContext.WorkExperienceService.GetAllWorkExperience}`)
            return plainToInstance(WorkExperience, result);
        }
        catch(error){
            this.logger.error(`${ELoggerContext.WorkExperienceService.GetAllWorkExperience} with error ${error}`)
            throw error;
        }
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
            this.logger.log(`${ELoggerContext.WorkExperienceService.AddWorkExperience} with workExperienceImg ${workExperienceImg} and workExperience ${workExperience}`)
            return plainToInstance(WorkExperience, result, { excludeExtraneousValues: true });
        }
        catch(error){
            this.logger.error(`${ELoggerContext.WorkExperienceService.AddWorkExperience} error ${error} with workExperienceImg ${workExperienceImg} and workExperience ${workExperience}`)
            throw error;
        }
    }

    async deleteWorkExperience(idSkills:number):Promise<WorkExperience>{
        try {
            const result=await this.prisma.workExperience.delete({
                where:{
                    id:idSkills
                }
            })
            this.logger.log(`${ELoggerContext.WorkExperienceService.DeleteWorkExperience} with ${idSkills}`)
            return plainToInstance(WorkExperience, result, { excludeExtraneousValues: true });
        }
        catch(error){
            this.logger.error(`${ELoggerContext.WorkExperienceService.DeleteWorkExperience} error ${error} with idSkills ${idSkills}`)
            throw error;
        }
    }
    
    async updateWorkExperience(idWorkExperience:number,workExperience:WorkExperience){
        try{
        const result=await this.prisma.workExperience.update({
            data: {
                endDate: workExperience.endDate,
                job: workExperience.job,
                nameCompany: workExperience.nameCompany,
                srcImg: workExperience.srcImg,
                startDate: workExperience.startDate,
                tasks: workExperience.tasks,
                content:workExperience.content,
                stack:workExperience.stack as [],
            },
            where: {
                id:idWorkExperience
            }
        })
        this.logger.log(`${ELoggerContext.WorkExperienceService.UpdateWorkExperience} with idSkills ${idWorkExperience}`)
        return plainToInstance(WorkExperience, result, { excludeExtraneousValues: true });
        }
        catch(error){
        this.logger.log(`${ELoggerContext.WorkExperienceService.UpdateWorkExperience} error ${error} with idSkills ${idWorkExperience}`)
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
        
