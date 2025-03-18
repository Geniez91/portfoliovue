import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {createClient,SupabaseClient} from '@supabase/supabase-js'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAccessToken } from './auth.interface';
import { ELoggerContext } from '@/logger/constant';

@Injectable()
export class AuthService {
    private supabase:SupabaseClient;
    private readonly logger=new Logger(AuthService.name)

    constructor(private jwtService:JwtService,  private configService: ConfigService,){
        this.supabase=createClient(
            this.configService.get<string>('SUPABASE_URL')!,
            this.configService.get<string>('SUPABASE_ANON_KEY')!
        )
    }

    async signIn(email:string,password:string):Promise<IAccessToken>{
        const {data,error}=await this.supabase.auth.signInWithPassword({email,password})

        if(error){
            this.logger.error(`${ELoggerContext.AuthService.signIn} with email : ${email} and password : ${password} and error ${error}`)
            throw new UnauthorizedException()
        }
        const payload={sub:data.user.id,email:data.user.email};
        this.logger.debug(`${ELoggerContext.AuthService.signIn} with email : ${email} and password : ${password}`)
        return {access_token:await this.jwtService.signAsync(payload)}
    }
}
