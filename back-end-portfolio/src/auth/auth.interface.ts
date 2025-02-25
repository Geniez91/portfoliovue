import { IsString } from "class-validator";

export class SignInDto{
    @IsString()
    email:string

    @IsString()
    password:string
}

export interface IAccessToken{
    access_token:string
}