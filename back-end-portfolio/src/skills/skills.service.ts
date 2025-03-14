import { Injectable } from '@nestjs/common';
import { PrismaService } from "@/prisma/prisma.service"
import {  AddSkills, Skills } from './skills.interface';
import { plainToInstance } from 'class-transformer';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SkillsService {
     private supabase:SupabaseClient;
     
    constructor(private prisma:PrismaService, private configService: ConfigService){
                this.supabase=createClient(
                    this.configService.get<string>('SUPABASE_URL')!,
                    this.configService.get<string>('SUPABASE_ANON_KEY')!
                )
    }

    async getAllSkills(): Promise<Skills[]> {
        const result = await this.prisma.skills.findMany();
        const resultArray = Array.isArray(result) ? result : [result];  // Si c'est un objet, le transformer en tableau
return plainToInstance(Skills, resultArray, { excludeExtraneousValues: true });
    }
    

    async addSkills(file: string, skills: AddSkills):Promise<void>{

        await this.prisma.skills.create({
            data:{
                idType:skills.idType,
                language:skills.language,
                usageExperience:skills.usageExperience,
                yearsExperience:skills.yearsExperience,
                srcImg:file,
            }
        })
    }

    async updateSkills(idSkills:number,skills:Skills):Promise<void>{
        await this.prisma.skills.update({
            data: {
                language: skills.language,
                srcImg: skills.srcImage,
                idType: skills.idType,
                usageExperience: skills.usageExperience,
                yearsExperience: skills.yearsExperience,
            },
            where: {
                id:idSkills
            }
        })
}
async deleteSkills(idSkills:number):Promise<void>{
    await this.prisma.skills.delete({
        where:{
            id:idSkills
        }
    })
}

async uploadImage(file:Express.Multer.File):Promise<string>{
    const fileName=file.originalname;

    try{
        console.log(file.buffer)
        const { data, error } = await this.supabase.storage.from('skills').upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600',
            upsert: false,
        });

        console.log('Upload successful, data:', data);

        if (error) {
            console.error('Error getting public URL:', error);
            throw new Error('Error getting public URL');
        }

        const {data:publicUrlData}=await this.supabase.storage.from('skills').getPublicUrl(fileName)
        console.log('Image uploaded successfully. Public URL: ', publicUrlData.publicUrl);
        return publicUrlData.publicUrl
    }
    catch(error){
        throw error
    }




}
}
