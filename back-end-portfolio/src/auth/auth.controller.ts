import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDTO:SignInDto){
        return this.authService.signIn(signInDTO.email,signInDTO.password)
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgotten-password')
    forgottenPassword(@Body() body:{email:string}){
        return this.authService.forgottenPasswordEmail(body.email)
    }

}
