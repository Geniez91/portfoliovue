import { ELoggerContext } from "@/logger/constant";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';
import { EStorageBucket } from "./storage.enum";

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;
private readonly logger = new Logger();
    constructor( private configService: ConfigService,) {
            this.supabase = createClient(
              this.configService.get<string>('SUPABASE_URL')!,
              this.configService.get<string>('SUPABASE_ANON_KEY')!,
            );
          }
    
async uploadFile(bucket:EStorageBucket,file: Express.Multer.File ): Promise<string>{
   const fileName = `${uuidv4()}_${file.originalname}`;
     const { error } = await this.supabase.storage
        .from(bucket)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.log(error);
        throw new Error('Error getting public URL');
      }
      const { data: publicUrlData } = await this.supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      this.logger.log(
        `${ELoggerContext.SkillsService.UploadSkillImage} with file ${file}`,
      );
      return publicUrlData.publicUrl;
}

async uploadManyFiles(bucket:EStorageBucket,files: Express.Multer.File[]): Promise<string[]>{
  return Promise.all(
    files.map((file) => this.uploadFile(bucket, file)),
  );
}

}