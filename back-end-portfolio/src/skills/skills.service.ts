import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service"
import {  AddSkills, Skills } from './skills.interface';
import { plainToInstance } from 'class-transformer';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { ELoggerContext } from '@/logger/constant';

@Injectable()
export class SkillsService {
     private supabase:SupabaseClient;
     private readonly logger=new Logger(SkillsService.name)
     
    constructor(private prisma:PrismaService, private configService: ConfigService){
                this.supabase=createClient(
                    this.configService.get<string>('SUPABASE_URL')!,
                    this.configService.get<string>('SUPABASE_ANON_KEY')!
                )
    }

    async getAllSkills(): Promise<Skills[]> {
        const result = await this.prisma.skills.findMany();
        const resultArray = Array.isArray(result) ? result : [result]; 
return plainToInstance(Skills, resultArray, { excludeExtraneousValues: true });
    }
    

    async addSkills(file: string, skills: AddSkills):Promise<Skills>{
        try{
          const result= await this.prisma.skills.create({
                data:{
                    idType:skills.idType,
                    language:skills.language,
                    usageExperience:skills.usageExperience,
                    yearsExperience:skills.yearsExperience,
                    srcImg:file,
                }
            })
            this.logger.log(`${ELoggerContext.SkillsService.AddSkills} with  file : ${file} and language : ${skills.language}`)
            return plainToInstance(Skills, result, { excludeExtraneousValues: true });
        }
        catch(error){
            this.logger.error(`${ELoggerContext.SkillsService.AddSkills} with file : ${file} and language : ${skills.language} with error ${error}`)
            throw error;
        }  
    }

    async updateSkills(idSkills:number,file:string,skills:AddSkills):Promise<Skills>{
        try{
            const result=await this.prisma.skills.update({
                data: {
                    language: skills.language,
                    srcImg: file,
                    idType: skills.idType,
                    usageExperience: skills.usageExperience,
                    yearsExperience: skills.yearsExperience,
                    
                },
                where: {
                    id:idSkills
                }
            })
            this.logger.log(`${ELoggerContext.SkillsService.UpdateSkills} with idSkills ${idSkills}`)
            return plainToInstance(Skills, result, { excludeExtraneousValues: true });
        }
        catch(error){
            this.logger.error(`${ELoggerContext.SkillsService.UpdateSkills} with idSkills ${idSkills} with error ${error}`)
            throw error;
        }


}
async deleteSkills(idSkills:number):Promise<Skills>{
    try{
       const result= await this.prisma.skills.delete({
            where:{
                id:idSkills
            }
        })
        this.logger.log(`${ELoggerContext.SkillsService.DeleteSkills} with idSkills ${idSkills}`)
        return plainToInstance(Skills, result, { excludeExtraneousValues: true });
    }
    catch(error){
        this.logger.log(`${ELoggerContext.SkillsService.DeleteSkills} with idSkills ${idSkills} with an error ${error}`)
        throw error;
    }

}

async uploadImage(file:Express.Multer.File):Promise<string>{
    const fileName=file.originalname;
    try{
        const { data, error } = await this.supabase.storage.from('skills').upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600',
            upsert: false,
        });
        if (error) {
            throw new Error('Error getting public URL');
        }
        const {data:publicUrlData}=await this.supabase.storage.from('skills').getPublicUrl(fileName)
        this.logger.log(`${ELoggerContext.SkillsService.UploadImage} with file ${file}`)
        return publicUrlData.publicUrl
    }
    catch(error){
        this.logger.error(`${ELoggerContext.SkillsService.UploadImage} with file ${file} with an error ${error}`)
        throw error
    }
}
}