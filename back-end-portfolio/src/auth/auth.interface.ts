import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDto{
    @ApiProperty()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    password:string
}

export interface IAccessToken{
    access_token:string
}