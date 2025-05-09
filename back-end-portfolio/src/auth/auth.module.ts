import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './auth.constant';

@Module({
  imports:[    JwtModule.register({
    global:true,
    secret:JWT_CONSTANT.secret,
    signOptions:{expiresIn:'3h'}
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
