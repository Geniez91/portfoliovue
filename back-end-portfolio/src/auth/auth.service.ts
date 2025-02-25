import { Injectable, UnauthorizedException } from '@nestjs/common';
import {createClient,SupabaseClient} from '@supabase/supabase-js'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAccessToken } from './auth.interface';

@Injectable()
export class AuthService {
    private supabase:SupabaseClient;

    constructor(private jwtService:JwtService,  private configService: ConfigService,){
        this.supabase=createClient(
            this.configService.get<string>('SUPABASE_URL')!,
            this.configService.get<string>('SUPABASE_ANON_KEY')!
        )
    }

    async signIn(email:string,password:string):Promise<IAccessToken>{
        const {data,error}=await this.supabase.auth.signInWithPassword({email,password})

        if(error){
            throw new UnauthorizedException()
        }
        const payload={sub:data.user.id,email:data.user.email};
        return {access_token:await this.jwtService.signAsync(payload)}
    }
}
