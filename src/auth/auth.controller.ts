import { Controller,Body,Post,HttpCode,HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from "src/decorators/auth-public-decorators";
import { AuthDto } from "./dto/auth.dto";
import { UsersService } from "src/users/users.service";

@Controller()
export class AuthController {
    constructor(private authService:AuthService, private userService:UsersService) {}

    // login
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async signIn(@Body() signInDto:AuthDto){
        const user = await this.userService.findOne(signInDto.email);
        if (!user) {
            throw new HttpException(
                '존재하지 않는 아이디입니다.',
                HttpStatus.BAD_REQUEST
            );
        }
        return this.authService.signIn(signInDto.email,signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Post('signup')
    async signUp(@Body() signUpDto:AuthDto){
        return this.authService.signUp(signUpDto.email,signUpDto.password,signUpDto.username);
    }
}
