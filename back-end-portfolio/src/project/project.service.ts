import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service"
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { Project } from './project.interface';
import { plainToInstance } from 'class-transformer';
import { ELoggerContext } from '@/logger/constant';
import { v4 as uuidv4 } from 'uuid';

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

    async addProject(projet:Project):Promise<Project>{
        try{
            const result=await this.prisma.project.create({
                data:{
                    content:projet.content,
                    linkGithub:projet.linkGitHub,
                    description:projet.description,
                    name:projet.name,
                    nbCollaborator:projet.nbCollaborator,
                    stackImg:projet.stackImg as [],
                    year:projet.year,
                    thumbnail:projet.thumbnail 
                }
            })
            return plainToInstance(Project,result)
        }
        catch(error){
            throw error;
        }
    }

        async uploadImage(file:Express.Multer.File):Promise<string>{
            const fileName = `${uuidv4()}_${file.originalname}`; 
            try{
                const { data, error } = await this.supabase.storage.from('projet').upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    cacheControl: '3600',
                    upsert: true,
                });
                if (error) {
                    console.log(error)
                    throw new Error('Error getting public URL');
                }
                const {data:publicUrlData}=await this.supabase.storage.from('projet').getPublicUrl(fileName)
                this.logger.log(`${ELoggerContext.SkillsService.UploadImage} with file ${file}`)
                return publicUrlData.publicUrl
            }
            catch(error){
                this.logger.error(`${ELoggerContext.SkillsService.UploadImage} with file ${file} with an error ${error}`)
                throw error
            }
        }

        async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
        const urls: string[] = [];
        for (const file of files) {
            const url = await this.uploadImage(file); 
            urls.push(url);
        }
        return urls;
}

async deleteProject(idProject:number):Promise<Project>{
    try{
        const result=await this.prisma.project.delete({
            where:{
                id:idProject
            }
        })
        return plainToInstance(Project, result);
    }
    catch(error){
        throw error;
    }
}

}