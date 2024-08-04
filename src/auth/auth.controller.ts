import { Controller,Body,Post,HttpCode,HttpStatus, HttpException, UseInterceptors, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from "src/decorators/auth-public-decorators";
import { AuthDto } from "./dto/auth.dto";
import { UsersService } from "src/users/users.service";
import { ResponseMsg } from "src/decorators/response-decorate";
import { ResponseTransformInterceptor } from "src/interceptors/response-transform-interceptors";

@Controller()
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
    constructor(private authService:AuthService, private userService:UsersService) {}

    // login
    @HttpCode(HttpStatus.OK)
    @ ResponseMsg('로그인 성공')
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
        const signInResult= this.authService.signIn(signInDto.email,signInDto.password);
        return signInResult;
    }

    @HttpCode(HttpStatus.CREATED)
    @ ResponseMsg('회원가입 성공')
    @Public()
    @Post('signup')
    async signUp(@Body() signUpDto:AuthDto){
        const idCheck = await this.authService.idCheck(signUpDto.email);
        if (!idCheck) {
            throw new HttpException(
                '이미 존재하는 아이디입니다.',
                HttpStatus.BAD_REQUEST
            );
        }
        const signUpResult = this.authService.signUp(signUpDto.email,signUpDto.password,signUpDto.username);
        return signUpResult
    }
}
