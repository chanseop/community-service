import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(id: string, pass: string) : Promise<{access_token:string}>{
        const user = await this.usersService.findOne(id);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { id: user.id, sub: user.userId };
        
        return {
            access_token:await this.jwtService.signAsync(payload)
        };
    }
}
