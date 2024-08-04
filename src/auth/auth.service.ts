import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { env } from "process";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(email);
        const checkPw = await bcrypt.compare(pass, user.password);
        if (!checkPw) {
            throw new UnauthorizedException(
                '아이디 또는 비밀번호가 일치하지 않습니다.'
            );
        }
        const payload = { email: user.email, sub: user.id, role: user.role, username: user.username };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token };
    }

    // id중복체크
    async idCheck(email: string){
        const userCheck = await this.usersService.findOne(email);
        if (userCheck) {
            return false;
        }
        return true;

    }

    // 회원가입
    async signUp(email: string, pass: string, username: string) {
        await this.idCheck(email);
        const hashedPassword = await bcrypt.hash(pass, 10);
        return this.usersService.create(email, hashedPassword, username);
    }
        

}
