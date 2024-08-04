import { Controller,Body,Post,HttpCode,HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService:AuthService) {}


    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto:Record<string,any>){
        return this.authService.signIn(signInDto.id,signInDto.password);
    }
}
